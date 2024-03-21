import { Router } from "express";
import { shippingController } from "../controllers/index.js";

const shippingRouter = Router()
const orderPrefix = `/api/${process.env.API_VERSION}/shippings`

// GET: /api/v1/shippings/create
shippingRouter.post(`${orderPrefix}/create`, shippingController.createShipping)

export default shippingRouter
