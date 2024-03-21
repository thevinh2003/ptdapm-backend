import { Router } from "express";
import { cartController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const cartRouter = Router();
const cartPrefix = `/api/${process.env.API_VERSION}/carts`;

// GET: /api/v1/carts
cartRouter.get(cartPrefix, cartController.getAllCart);

// GET: /api/v1/carts/user
cartRouter.get(
  `${cartPrefix}/user`,
  authMiddleware.checkToken,
  cartController.getCartByUser
);

// GET: /api/v1/carts/product
cartRouter.get(
  `${cartPrefix}/product`,
  authMiddleware.checkToken,
  cartController.getCartProductByUser
);

// POST: /api/v1/carts/add
cartRouter.post(
  `${cartPrefix}/add`,
  authMiddleware.checkToken,
  cartController.addCart
);

// DELETE: /api/v1/carts/remove
cartRouter.delete(`${cartPrefix}/remove`, cartController.removeCart);

// POST: /api/v1/carts/cartdetail/change
cartRouter.post(
  `${cartPrefix}/cartdetail/change`,
  cartController.changeProductCartDetail
);

// DELETE: /api/v1/carts/remove/all
cartRouter.post(`${cartPrefix}/remove/all`, cartController.removeAllCart);

export default cartRouter;
