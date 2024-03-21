import db from '../models/index.js'

const shippingService = {
    createShipping: (data) => {
        return new Promise((resolve, reject) => {
            db.Shipping.create(data)
            .then(resolve)
            .catch(reject)
        })
    },
    getShippingDateByOrderId: (orderId) => {
        return new Promise((resolve, reject) => {
            db.Shipping.findOne({
                where: {
                    OrderID: orderId
                },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    removeShippingByOrderID: (orderId) => {
        return new Promise((resolve, reject) => {
            db.Shipping.destroy({
                where: {
                    OrderID: orderId
                }
            })
            .then(resolve)
            .catch(reject)
        })
    }
}

export default shippingService
