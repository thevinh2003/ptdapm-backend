import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import voucherRouter from "./vourcherRoute.js";
import paymentRouter from "./paymentRouter.js";
import shippingRouter from "./shippingRouter.js";
import reportRouter from "./reportRouter.js";
import reviewRouter from "./reviewRouter.js";
import categoryRouter from "./categoryRouter.js";
import orderRouter from "./orderRouter.js";

const privateRouter = {
  authRouter,
  userRouter,
  productRouter,
  voucherRouter,
  paymentRouter,
  shippingRouter,
  reportRouter,
  reviewRouter,
  categoryRouter,
  orderRouter
};
export default privateRouter;
