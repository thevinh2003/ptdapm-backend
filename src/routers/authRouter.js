import { Router } from "express";
import dotenv from "dotenv";
import { authController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";
dotenv.config();
import passport from "passport";

const authRouter = Router();

// ============ AUTHEN ============
const authPrefix = `/api/${process.env.API_VERSION}/auth`;

// POST: /api/v1/auth/register
authRouter.post(`${authPrefix}/register`, authController.register);

// POST: /api/v1/auth/login
authRouter.post(`${authPrefix}/login`, authController.login);

// GET: /api/v1/auth/google
authRouter.get(
  `${authPrefix}/google`,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// GET: /api/v1/auth/google/callback
authRouter.get(
  `${authPrefix}/google/callback`,
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  authController.loginSocialMedia
);

// GET: /api/v1/auth/facebook
authRouter.get(
  `${authPrefix}/facebook`,
  passport.authorize("facebook", { scope: ["email"] })
);

// GET: /api/v1/auth/facebook/callback
authRouter.get(
  `${authPrefix}/facebook/callback`,
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  authController.loginSocialMedia
);

// DELETE: /api/v1/auth/logout
authRouter.delete(
  `${authPrefix}/logout`,
  authMiddleware.checkToken,
  authController.logout
);

// GET: /api/v1/auth/active
authRouter.get(`${authPrefix}/active`, authController.activeAccount);

// POST: /api/v1/auth/refreshtoken
authRouter.post(`${authPrefix}/refreshtoken`, authController.refreshToken);

// POST: /api/v1/auth/forgotpassword
authRouter.post(`${authPrefix}/forgotpassword`, authController.forgotPassword);

// GET: /api/v1/auth/forgotpassword/verify
authRouter.get(
  `${authPrefix}/forgotpassword/verify`,
  authController.generateTempPassword
);

// POST: /api/v1/auth/changepassword
authRouter.post(
  `${authPrefix}/changepassword`,
  authMiddleware.checkToken,
  authController.changePassword
);

// DELETE: /api/v1/auth/delete
authRouter.delete(
  `${authPrefix}/delete`,
  authMiddleware.checkToken,
  authController.cancelIsActive,
  authController.logout
);

export default authRouter;
