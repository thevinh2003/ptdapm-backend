import { Router } from "express";
import {
  authMiddleware,
  optimizeImage,
  uploadImage,
} from "../middlewares/index.js";
import {
  productController,
  productReviewController,
} from "../controllers/index.js";

const productRouter = Router();
const productPrefix = `/api/${process.env.API_VERSION}/products`;

// POST /api/v1/products/create
productRouter.post(
  `${productPrefix}/create`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  optimizeImage,
  uploadImage.single("image"),
  productController.createProduct
);

// GET /api/v1/products
productRouter.get(`${productPrefix}`, productController.getAllProducts);

// GET /api/v1/products/id
productRouter.get(`${productPrefix}/id`, productController.getProductByArrId);

// GET /api/v1/products/filter
productRouter.get(`${productPrefix}/filter`, productController.filterProducts);

// GET: /api/v1/products/favorite
productRouter.get(
  `${productPrefix}/favorite`,
  authMiddleware.checkToken,
  productController.getFavoriteProducts
);

// GET /api/v1/products/:id/user
productRouter.get(
  `${productPrefix}/:id/user`,
  authMiddleware.checkToken,
  productController.getProductByIdWithUser
);

// GET /api/v1/products/:id/reviews
productRouter.get(
  `${productPrefix}/:id/reviews`,
  productReviewController.getReviewsByProductID
);

// POST /api/v1/products/reviews/create
productRouter.post(
  `${productPrefix}/reviews/create`,
  authMiddleware.checkToken,
  productReviewController.createReview
);

// GET /api/v1/products/:id
productRouter.get(`${productPrefix}/:id`, productController.getProductById);

// GET /api/v1/products/:id/related
productRouter.get(
  `${productPrefix}/:id/related`,
  productController.getRelatedProducts
);

// PUT /api/v1/products/update/:id
productRouter.put(
  `${productPrefix}/update/:id`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  optimizeImage,
  uploadImage.single("image"),
  productController.updateProduct
);

// DELETE /api/v1/products/delete/:id
productRouter.delete(
  `${productPrefix}/delete/:id`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  productController.deleteProduct
);

// POST: /api/v1/products/favorite/add
productRouter.post(
  `${productPrefix}/favorite/add`,
  authMiddleware.checkToken,
  productController.addProductToFavorite
);

// POST: /api/v1/products/favorite/remove
productRouter.post(
  `${productPrefix}/favorite/remove`,
  authMiddleware.checkToken,
  productController.removeProductFromFavorite
);

export default productRouter;
