import { Router } from "express";
import dotenv from "dotenv";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";
dotenv.config();

const userRouter = Router();
const userPrefix = `/api/${process.env.API_VERSION}/users`;

// GET /api/v1/users
userRouter.get(
  `${userPrefix}`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  userController.getAllUsers
);

// GET /api/v1/current-user
userRouter.get(
  `${userPrefix}/current-user`,
  authMiddleware.checkToken,
  userController.getCurrentUser
);

// GET /api/v1/users/:id
userRouter.get(`${userPrefix}/:id`, userController.getUserById);

// GET /api/v1/users/:username
userRouter.get(`${userPrefix}/:username`, userController.getUserByUsername);

// PUT /api/v1/users/update/:id
userRouter.put(
  `${userPrefix}/update/:id`,
  authMiddleware.checkToken,
  userController.updateUser
);

// DELETE /api/v1/users/delete/:id
userRouter.delete(
  `${userPrefix}/delete/:id`,
  authMiddleware.checkToken,
  userController.deleteUser
);

export default userRouter;
