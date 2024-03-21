import privateRouter from "./privateRouter.js";
import publicRouter from "./publicRouter.js";

export default function appRouter(app) {
  app.use("/", privateRouter.authRouter);
  app.use("/", privateRouter.userRouter);
  app.use("/", publicRouter.cartRouter);
  app.use("/", privateRouter.productRouter);
  app.use('/', privateRouter.orderRouter)
  app.use('/', privateRouter.voucherRouter)
  app.use('/', privateRouter.paymentRouter)
  app.use('/', privateRouter.shippingRouter)
  app.use("/", privateRouter.reportRouter)
  app.use('/', privateRouter.reviewRouter)
  app.use("/", privateRouter.reportRouter);
  app.use("/", privateRouter.categoryRouter);
  app.use("/", privateRouter.paymentRouter);
}
