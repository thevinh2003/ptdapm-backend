import { Router } from "express";
import { voucherController } from "../controllers/index.js";

const voucherRouter = Router()
const vourcherPrefix = `/api/${process.env.API_VERSION}/vouchers`

// POST: /api/v1/vouchers/create
voucherRouter.post(`${vourcherPrefix}/create`, voucherController.createVoucher)

// GET: /api/v1/vouchers
voucherRouter.get(vourcherPrefix, voucherController.getAllVouchers)

// POST: /api/v1/vouchers/edit/:id
voucherRouter.post(`${vourcherPrefix}/edit/:id`, voucherController.updateVoucher)

// GET: /api/v1/vouchers/:id
voucherRouter.get(`${vourcherPrefix}/:id`, voucherController.getVoucherById)

// DELETE: /api/v1/vouchers/delete/:id
voucherRouter.delete(`${vourcherPrefix}/delete/:id`, voucherController.deleteVoucher)

// GET: /api/v1/vouchers/valid
voucherRouter.get(`${vourcherPrefix}/valid`, voucherController.getAllValidVoucher)

export default voucherRouter
