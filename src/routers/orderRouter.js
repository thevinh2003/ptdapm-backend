import { Router } from "express";
import { orderController } from '../controllers/index.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const orderRouter = Router()
const orderPrefix = `/api/${process.env.API_VERSION}/orders`

// GET: /api/v1/orders
orderRouter.get(`${orderPrefix}/detail`, orderController.getAllOrdersDetail)

// GET: /api/v1/orders/history
orderRouter.get(`${orderPrefix}/history`, orderController.getPaidOrderHistory)

// GET: /api/v1/orders/create
orderRouter.post(`${orderPrefix}/create`, authMiddleware.checkToken, orderController.createOrder)

// POST: /api/v1/orders/cancel
orderRouter.post(`${orderPrefix}/cancel`, orderController.cancelOrder)

// GET: /api/v1/orders/is-ordered
orderRouter.get(`${orderPrefix}/is-ordered`, orderController.getAllOrdersDetailOrdered)

// GET: /api/v1/orders/detail/user/all
orderRouter.get(`${orderPrefix}/detail/user/all`, authMiddleware.checkToken, orderController.getAllOrdersDetailOrderedByUser)

// GET: /api/v1/orders/detail/user
orderRouter.get(`${orderPrefix}/detail/user`, authMiddleware.checkToken, orderController.getOrdersDetailOrderedByUser)


export default orderRouter