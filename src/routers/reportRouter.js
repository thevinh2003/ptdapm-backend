import { Router } from "express";
import { reportController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const reportRouter = Router();
const reportPrefix = `/api/${process.env.API_VERSION}/reports`;

// GET: /api/v1/reports/revenue
reportRouter.get(
  `${reportPrefix}/revenue`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  reportController.getRevenueReport
);

// GET: /api/v1/reports/product
reportRouter.get(
  `${reportPrefix}/product`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  reportController.getProductReport
);

// GET: /api/v1/reports/order
reportRouter.get(
  `${reportPrefix}/order`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  reportController.getOrderReport
);

// GET: /api/v1/reports/inventory
reportRouter.get(
  `${reportPrefix}/inventory`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  reportController.getInventoryReport
);

// GET: /api/v1/reports/shipping
reportRouter.get(
  `${reportPrefix}/shipping`,
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  reportController.getShippingReport
);

// GET: /api/v1/reports/revenue/today
reportRouter.get(`${reportPrefix}/revenue/today`, reportController.getRevenueReportToday);

export default reportRouter;
