import { voucherService } from "../services/index.js";

const voucherController = {
    createVoucher: async(req, res) => {
        try {
            const {voucherName, voucherValue, quantity} = req.body
            if (!voucherName || !voucherValue || !quantity) {
                return res.status(400).json("Missing parameters");
            } 
            const dataInput = {
                VoucherName: voucherName, 
                VoucherValue: +voucherValue, 
                Quantity: +quantity
            }
            const vouchers = await voucherService.createVoucher(dataInput)
            if (vouchers) {
                res.status(200).json({
                    message: 'Successfully'
                })
            }
            else {
                res.status(500).json("Internal Server Error")
            }
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    },
    getAllVouchers: async(req, res) => {
        try {
            const vouchers = await voucherService.getAllVouchers()
            res.status(200).json({ vouchers,  total: vouchers.length })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    updateVoucher: async(req, res) => {
        try {
            const {voucherName, voucherValue, quantity} = req.body
            const { id } = req.params
            if (!voucherName || !voucherValue || !quantity) {
                return res.status(400).json("Missing parameters");
            } 
            const dataInput = {
                VoucherName: voucherName, 
                VoucherValue: +voucherValue, 
                Quantity: +quantity
            }
            const vouchers = await voucherService.updateVoucher(dataInput, id)
            if (vouchers) {
                res.status(200).json({
                    message: 'Update voucher successfully'
                })
            }
            else {
                res.status(500).json("Internal Server Error")
            }
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    getVoucherById: async(req, res) => {
        try {
            const { id } = req.params
            const vouchers = await voucherService.getVoucherById(id)
            res.status(200).json(vouchers)
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    deleteVoucher: async(req, res) => {
        try {
            const { id } = req.params
            const vouchers = await voucherService.deleteVoucher(id)
            if (vouchers > 0) {
                res.status(200).json({
                    message: 'Voucher deleted successfully'
                })
            }
            else {
                res.status(200).json('Voucher deleted failde')
            }
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    getAllValidVoucher: async(req, res) => {
        try {
            const vouchers = await voucherService.getAllValidVoucher()
            res.status(200).json(vouchers)
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    },
    checkVoucher: async(req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json("Missing parameters");
            } 
            const voucher = await voucherService.checkVoucher(id)
            if (!voucher) {
                return res.status(200).json({ isVoucher: false });
            }
            return res.status(200).json({ isVoucher: true })
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    }
}

export default voucherController
