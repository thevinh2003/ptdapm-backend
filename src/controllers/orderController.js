import { orderService, paymentService, shippingService, productService, voucherService } from "../services/index.js";

const orderController = {
    getAllOrdersDetail: async (req, res) => {
        try {
            const orders = await orderService.getAllOrdersDetail()
            await orders.reverse()
            return res.status(200).json({ orders, total: orders.length })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    getPaidOrderHistory: async (req, res) => {
        try {
            const {userId, orderStatus} = req.query
            if (!userId || !orderStatus) {
                return res.status(400).json("Missing parameters");
            }
            const data = await orderService.getPaidOrderHistory(userId, orderStatus)
            return res.status(200).json(data)
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    },
    createOrder: async (req, res) => {
        try {
            const {
                totalAmount, 
                voucherId,
                paymentMethod, 
                shippingAddress, 
                shippingMethods,
                shippingcost,
            } = req.body.orders
            const products = req.body.products
            const id = req.decodeToken?.user?.id;
            if (!totalAmount || !paymentMethod || !shippingAddress || !shippingMethods || !shippingcost) {
                return res.status(400).json("Missing parameters");
            }
            const voucher = await voucherService.getVoucherById(voucherId)
            if (voucher.Quantity - 1 < 0) {
                return res.status(200).json({ errCode: 1, message: 'Mã giảm giá đã hết hạn!' });
            }
            const isDecrementQuantity = await voucherService.decrementQuantity(voucherId)
            const data = {
                UserID: id, 
                VoucherID: voucherId ? voucherId : null,
                TotalAmount: totalAmount,
                PaymentMethod: paymentMethod,
                ShippingAddress: shippingAddress,
                ShippingMethods: shippingMethods
            }
            const order = await orderService.createOrder(data)
            const inputPayment = {
                OrderID: order.id,
                PaymentDate: paymentMethod === 'cod' ? null : new Date()
            }
            const dataShipping = {
                OrderID: order?.id,
                ShippingDate: new Date(new Date().getTime() + 3 * 60000),
                ShippingCost: shippingcost
            }
            const orderDetail = await orderService.createOrderDetail(products, order.id)
            const updateProduct = await productService.updateStock(products)
            const payment = await paymentService.createPayment(inputPayment)
            const shipping = await shippingService.createShipping(dataShipping)
            if (orderDetail && updateProduct && payment && shipping && isDecrementQuantity) {
                return res.status(200).json({message: 'Success'})
            }
            return res.status(200).json({message: 'Falied'})
        } catch (e) {
            console.log(e);
            return res.status(500).json("Internal Server Error");
        }
    },
    cancelOrder: async (req, res) => {
        try {
            const {orderId} = req.body
            if (!orderId) {
                return res.status(400).json("Missing parameters");
            }
            const shipping = await shippingService.getShippingDateByOrderId(orderId)
            if (!shipping) {
                return res.status(404).json({ message: "No shipping founded" });
            }
            if (shipping.ShippingDate <= new Date()) {
                return res.status(404).json({ message: "The order cancellation deadline has passed" });
            }
            const infoOrder = await orderService.cancelOrder(orderId)
            const infoShipping = await shippingService.removeShippingByOrderID(orderId)
            res.status(200).json({infoOrder, infoShipping})
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    },
    getAllOrdersDetailOrdered: async (req, res) => {
        try {
            const orders = await orderService.getAllOrdersDetailOrdered()
            await orders.reverse()
            return res.status(200).json({ orders, total: orders.length })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    getAllOrdersDetailOrderedByUser: async (req, res) => {
        try {
            const {type} = req.query 
            const id = req.decodeToken?.user?.id;
            const orders = await orderService.getAllOrdersDetailOrderedByUser(+id, type)
            await orders.reverse()
            return res.status(200).json(orders)
        } catch (e) {
            console.log(e)
            return res.status(500).json("Internal Server Error");
        }
    },
    getOrdersDetailOrderedByUser: async (req, res) => {
        try {
            const {id, type} = req.query 
            const userId = req.decodeToken?.user?.id;
            const orders = await orderService.getOrdersDetailOrderedByUser(+userId, +id, type)
            await orders.reverse()
            return res.status(200).json(orders)
        } catch (e) {
            console.log(e)
            return res.status(500).json("Internal Server Error");
        }
    },
}

export default orderController
