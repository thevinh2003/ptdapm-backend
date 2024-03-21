import { productService, validateData } from "../services/index.js";
import { Op } from "sequelize";

const productController = {
  // @desc: Get all products
  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const products = await productService.getAllProducts({ page });
      if (products.length === 0)
        return res.status(404).json({ message: "No product found" });
      res.status(200).json({ products, total: products.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Get a product by id
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductByArrId: async (req, res) => {
    try {
      const { productId } = req.query;
      const data = productId.split(",");
      const product = await productService.getProductByArrId(data);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductByIdWithUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userID = req.decodeToken?.user?.id;
      const product = await productService.getProductByIdWithUser(id, userID);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // @desc: Create a new product
  createProduct: async (req, res) => {
    try {
      const {
        ProductName,
        Price,
        Description,
        StockQuantity,
        StockPrice,
        Size,
        Color,
        CategoryID = 1,
      } = req.body;
      const PhotoLink = req?.file?.path ?? "";
      const message = validateData.productData({
        ProductName,
        Price,
        Description,
        StockQuantity,
        Size,
        Color,
      });
      if (message) return res.status(400).json({ ...message });
      if (PhotoLink === "")
        return res.status(400).json({ message: "Photo is required" });

      const newProduct = await productService.createProduct({
        ProductName,
        Price,
        Description,
        StockQuantity,
        StockPrice,
        Size: Size?.map((size) => size.trim().replace(/"/g, ""))?.join(", "),
        Color,
        PhotoLink,
      });
      await productService.addProductCategory({
        ProductID: newProduct.id,
        CategoryID,
      });
      res
        .status(201)
        .json({ message: "Create product successfully", newProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Update a product by id
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        ProductName,
        Price,
        Description,
        StockQuantity,
        StockPrice,
        Size,
        Color,
        CategoryID,
      } = req.body;

      const message = validateData.productData({
        ProductName,
        Price,
        Description,
        StockQuantity,
        Size,
        Color,
      });
      if (message) return res.status(400).json({ ...message });

      const PhotoLink = req?.file?.path ?? "";
      if (PhotoLink === "") {
        productService.updateProduct(id, {
          ProductName,
          Price,
          Description,
          StockQuantity,
          Size: Size?.map((size) => size.trim().replace(/"/g, ""))?.join(", "),
          Color,
        });
      } else {
        productService.updateProduct(id, {
          ProductName,
          Price,
          Description,
          StockQuantity,
          StockPrice,
          Size: Size?.map((size) => size.trim().replace(/"/g, ""))?.join(", "),
          Color,
          PhotoLink,
        });
      }
      if (CategoryID) {
        await productService.updateProductCategory(id, {
          CategoryID,
        });
      }
      res.status(200).json({ message: "Update product successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Delete a product by id
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(200).json({ message: "Delete product successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Filter products
  filterProducts: async (req, res) => {
    try {
      const {
        name,
        latest,
        mostSold,
        lowestPrice,
        highestPrice,
        priceRange,
        color,
        size,
      } = req.query;
      let filterOptions = {};
      if (name)
        filterOptions = {
          ...filterOptions,
          where: { ProductName: { [Op.like]: `%${name}%` } },
        };
      else if (latest)
        filterOptions = { ...filterOptions, order: [["createdAt", "DESC"]] };
      else if (mostSold)
        filterOptions = { ...filterOptions, order: [["SellQuantity", "DESC"]] };
      else if (lowestPrice)
        filterOptions = { ...filterOptions, order: [["Price", "ASC"]] };
      else if (highestPrice)
        filterOptions = { ...filterOptions, order: [["Price", "DESC"]] };
      else if (priceRange) {
        const [min, max] = priceRange.split("-");
        filterOptions = {
          ...filterOptions,
          where: { Price: { [Op.between]: [min, max] } },
        };
      } else if (color)
        filterOptions = {
          ...filterOptions,
          where: { Color: { [Op.like]: `%${color}%` } },
        };
      else if (size)
        filterOptions = {
          ...filterOptions,
          where: { Size: { [Op.like]: `%${size}%` } },
        };

      const products = await productService.filterProducts(filterOptions);
      if (products.length === 0)
        return res.status(404).json({ message: "No product found" });
      res.status(200).json({ products, total: products.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Get related products
  getRelatedProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const relatedProducts = await productService.getRelatedProducts(id);
      if (relatedProducts.length === 0)
        return res.status(404).json({ message: "No related product found" });
      res.status(200).json({ relatedProducts, total: relatedProducts.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Add product to favorite
  addProductToFavorite: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const { ProductID } = req.body;
      await productService.addFavorite({
        UserID: id,
        ProductID,
      });
      res.status(200).json({ message: "Add product to favorite successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Remove product from favorite
  removeProductFromFavorite: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const { ListProductID } = req.body;
      await productService.removeFavorite(id, ListProductID);
      res
        .status(200)
        .json({ message: "Remove product from favorite successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // @desc: Get favorite products
  getFavoriteProducts: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      console.log(id);
      if (!id) {
        return res.status(400).json({ message: "User not found" });
      }
      const favoriteProducts = await productService.getAllFavoriteProducts(id);
      if (favoriteProducts.length === 0)
        return res.status(404).json({ message: "No favorite product found" });
      res
        .status(200)
        .json({ favoriteProducts, total: favoriteProducts.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
