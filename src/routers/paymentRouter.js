import { Router } from "express";
import { paymentController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const paymentRouter = Router()
const orderPrefix = `/api/${process.env.API_VERSION}/payments`
const paymentPrefix = `/api/${process.env.API_VERSION}/payment`;

// POST: /api/v1/payments/update-status
paymentRouter.post(`${orderPrefix}/update-status`, paymentController.updatePaymentStatusByOrderID)

// GET /api/v1/payment/:orderId
paymentRouter.get(
  `${paymentPrefix}/:orderId`,
  paymentController.getPaymentByOrderID
);

// PUT /api/v1/payment/update/:orderId
paymentRouter.put(
  `${paymentPrefix}/update/:orderId`,
  paymentController.updatePaymentStatusByOrderID
);

// DELETE /api/v1/payment/delete/:orderId
paymentRouter.delete(
  `${paymentPrefix}/delete/:orderId`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  paymentController.deletePaymentByOrderID
);

export default paymentRouter;
