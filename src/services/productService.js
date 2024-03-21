import db from "../models/index.js";
import { Sequelize } from "sequelize";

const productService = {
  createProduct: (product) => {
    return new Promise((resolve, reject) => {
      db.Product.create(product).then(resolve).catch(reject);
    });
  },
  getAllProducts: ({ page }) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        include: [
          {
            model: db.Category,
            through: { model: db.ProductCategory },
          },
        ],
        limit,
        offset,
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.Product.findOne({
        where: { id },
        include: [
          {
            model: db.Category,
            through: { model: db.ProductCategory },
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getProductByArrId: (data) => {
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: data,
          },
        },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  updateProduct: (id, product) => {
    return new Promise((resolve, reject) => {
      db.Product.update(product, { where: { id } }).then(resolve).catch(reject);
    });
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      db.Product.destroy({ where: { id } }).then(resolve).catch(reject);
    });
  },
  filterProducts: (filter) => {
    return new Promise((resolve, reject) => {
      db.Product.findAll(filter).then(resolve).catch(reject);
    });
  },
  updateStock: async (products) => {
    await Promise.all(
      products.map(async (item) => {
        await db.Product.update(
          {
            StockQuantity: Sequelize.literal(
              `StockQuantity - ${item?.CartDetail?.Quantity}`
            ),
            SellQuantity: Sequelize.literal(
              `SellQuantity + ${item?.CartDetail?.Quantity}`
            ),
          },
          { where: { id: item.id } }
        );
      })
    );
    return true;
  },
  getRelatedProducts: (productId) => {
    return new Promise((resolve, reject) => {
      const productCategory = db.ProductCategory.findOne({
        where: { ProductId: productId },
      });
      const relatedProducts = db.ProductCategory.findAll({
        where: { CategoryId: productCategory.CategoryId },
      })
        .then(resolve(relatedProducts))
        .catch(reject);
    });
  },
  addProductCategory: (productCategory) => {
    return new Promise((resolve, reject) => {
      db.ProductCategory.create(productCategory).then(resolve).catch(reject);
    });
  },
  updateProductCategory: (id, productCategory) => {
    return new Promise((resolve, reject) => {
      db.ProductCategory.update(productCategory, { where: { id } })
        .then(resolve)
        .catch(reject);
    });
  },
  getProductByIdWithUser: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.Product.findOne({
        where: { id },
        include: [
          {
            model: db.FavoriteProduct,
            where: { UserId: userId },
            required: false,
          },
          {
            model: db.Category,
            through: { model: db.ProductCategory },
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  addFavorite: ({ UserID, ProductID }) => {
    return new Promise(async (resolve, reject) => {
      const isFavorite = await db.FavoriteProduct.findOne({
        where: { UserID, ProductID },
      });
      if (isFavorite) {
        reject({ message: "Product is already in favorite list" });
      } else {
        db.FavoriteProduct.create({ UserID, ProductID })
          .then(resolve)
          .catch(reject);
      }
    });
  },
  removeFavorite: (userID, ListProductID) => {
    return new Promise((resolve, reject) => {
      db.FavoriteProduct.destroy({
        where: {
          UserID: userID,
          ProductID: { [db.Sequelize.Op.in]: ListProductID },
        },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getAllFavoriteProducts: (userId) => {
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        include: [
          {
            model: db.FavoriteProduct,
            where: { UserID: userId },
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
};

export default productService;
