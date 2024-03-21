import { shippingService } from "../services/index.js";

const shippingController = {
    createShipping: async (req, res) => {
        try {
            const { orderId }  = req.body
            if (!orderId) {
                return res.status(400).json("Missing parameters");
            }
            const data = {
                OrderID: orderId,
                ShippingDate: new Date(new Date().getTime() + 3 * 60000),
            }
            
            const shipping = await shippingService.createShipping(data)
            res.status(200).json(shipping)
        } catch (e) {
            res.status(500).json("Internal Server Error");
        }
    }
}

export default shippingController
