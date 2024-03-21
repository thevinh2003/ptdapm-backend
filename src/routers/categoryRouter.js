import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const categoryRouter = Router();
const categoryPrefix = `/api/${process.env.API_VERSION}/categories`;

// GET: /api/v1/categories
categoryRouter.get(categoryPrefix, categoryController.getAllCategories);

// GET: /api/v1/categories/:id
categoryRouter.get(`${categoryPrefix}/:id`, categoryController.getCategoryById);

// POST: /api/v1/categories/create
categoryRouter.post(
  `${categoryPrefix}/create`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  categoryController.createCategory
);

// PUT: /api/v1/categories/update/:id
categoryRouter.put(
  `${categoryPrefix}/update/:id`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  categoryController.updateCategory
);

// DELETE: /api/v1/categories/delete/:id
categoryRouter.delete(
  `${categoryPrefix}/delete/:id`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  categoryController.deleteCategory
);

export default categoryRouter;
