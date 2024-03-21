import e from "cors";
import { cartService, productService } from "../services/index.js";

const cartController = {
  // @desc: Get all carts
  getAllCart: async (req, res) => {
    try {
      const carts = await cartService.getAllCart();
      if (carts.length === 0)
        return res.status(404).json({ message: "No cart founded" });
      return res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCartByUser: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const carts = await cartService.getCartByUser(id);
      if (!carts) return res.status(404).json({ message: "No cart founded" });
      return res.status(200).json(carts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getCartProductByUser: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const { productId } = req.query;
      const data = productId.split(",");
      const carts = await cartService.getCartProductByUser(id, data);
      if (!carts)
        return res.status(404).json({ message: "No cart product founded" });
      return res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // @desc: Add a new cart
  addCart: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const { ProductID, Size, Quantity = 1, Color } = req.body;
      const cart = await cartService.getCartByUserId(id)
      let cartId = cart ? cart?.id : '' 
      if (!cart) {
        const newCart = await cartService.addCart({ userId: id })
        cartId = newCart.id
      }
      const cartDetail = await cartService.checkCartDetail({ProductID, Size, id})
      console.log('check: ', cartDetail)
      if (cartDetail) {
        await cartService.incrementProduct({ cartDetailId: cartDetail?.id });
      }else {
        const newCart = await cartService.addCartDetail({cartId, ProductID, Size, Quantity, Color})
      }
      return res
        .status(201)
        .json({ message: "Add cart successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //   @desc: Remove a cart
  removeCart: async (req, res) => {
    try {
      const { cartDetailId } = req.query;
      console.log('check: ', cartDetailId)
      const isRemoved = await cartService.removeCartDetail({ cartDetailId });
      if (isRemoved) {
        return res.status(200).json({ message: "Remove cart successfully" });
      } else {
        return res.status(400).json({ message: "Remove cart failed" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  removeAllCart: async (req, res) => {
    try {
      const { data } = req.body;
      const isRemoved = await cartService.removeAllCart(data);
      if (isRemoved) {
        return res.status(200).json({ message: "Remove cart successfully" });
      } else {
        return res.status(400).json({ message: "Remove cart failed" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  changeProductCartDetail: async (req, res) => {
    try {
      const { cartDetailId, quantity, type } = req.body;
      if (!cartDetailId || !type) {
        return res.status(400).json("Missing parameters");
      }
      let isUpdate = null;
      const cartDetail = await cartService.getCartDetail(cartDetailId)
      if (!cartDetail) {
        return res.status(400).json("Cartdetail is not exist");
      }
      console.log(cartDetail)
      if (type === "increment") {
        if (quantity + 1 <= cartDetail?.Product?.StockQuantity) {
          isUpdate = await cartService.incrementProduct({cartDetailId})
        }
      } else {
        if (quantity - 1 === 0) {
          isUpdate = await cartService.removeCartDetail({cartDetailId})
        }
        else {
          isUpdate = await cartService.decrementProduct({ cartDetailId });
        }
      }
      if (isUpdate) {
        return res
          .status(200)
          .json({ message: "Change product cartdetail successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Change product cartdetail failed" });
      }
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  },
};

export default cartController;
