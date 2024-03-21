import db from '../models/index.js'

const orderService = {
    getAllOrdersDetail: () => {
        return new Promise((resolve, reject) => {
            db.OrderDetail.findAll({
                attributes: ['id', 'Quantity', 'size', 'price'],
                include: [
                    {
                        model: db.Order,
                        attributes: ['id', 'OrderDate', 'TotalAmount', 'PaymentMethod', 'ShippingAddress', 'isCancelled', 'ShippingMethods'],
                        include: [
                            {
                                model: db.Voucher,
                                attributes: ['VoucherValue']
                            },
                            {
                                model: db.User,
                                attributes: ['id','FullName']
                            },
                            {
                                model: db.Shipping,
                                attributes: ['id', 'ShippingDate', 'ShippingStatus']
                            },
                            {
                                model: db.Payment,
                                attributes: ['PaymentDate', 'PaymentStatus']
                            }
                        ]
                    }, 
                    {
                        model: db.Product,
                    }
                ],
                // group: ['id'],
                // order: [['id', 'DESC']],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getPaidOrderHistory: (userId, orderStatus) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: { 
                    UserId: userId,
                    OrderStatus: orderStatus
                },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createOrder: (data) => {
        return new Promise((resolve, reject) => {
            db.Order.create(data)
            .then(resolve)
            .catch(reject)    
        })
    },
    createOrderDetail: async (products, orderId) => {
        await Promise.all(
            products.map(async item => {
                await db.OrderDetail.create({
                    OrderID: orderId,
                    ProductID: item.id,
                    Quantity: +item?.CartDetail?.Quantity,
                    Price: +item.price,
                    size: item?.CartDetail?.Size
                })
            })
        )
        return true
    },
    cancelOrder: (orderId) => {
        return new Promise((resolve, reject) => {
            db.Order.update({ isCancelled: true }, {
                where: { id: orderId }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getAllOrdersDetailOrdered: () => {
        return new Promise((resolve, reject) => {
            db.OrderDetail.findAll({
                attributes: ['id', 'Quantity', 'size', 'price'],
                include: [
                    {
                        model: db.Order,
                        attributes: ['id', 'OrderDate', 'TotalAmount', 'PaymentMethod', 'ShippingAddress', 'isCancelled', 'ShippingMethods'],
                        where: {
                            isCancelled: false
                        },
                        include: [
                            {
                                model: db.Voucher,
                                attributes: ['VoucherValue']
                            },
                            {
                                model: db.User,
                                attributes: ['id','FullName']
                            },
                            {
                                model: db.Shipping,
                                attributes: ['id', 'ShippingDate', 'ShippingStatus']
                            },
                            {
                                model: db.Payment,
                                attributes: ['PaymentDate', 'PaymentStatus']
                            }
                        ]
                    }, 
                    {
                        model: db.Product,
                    }
                ],
                // group: ['id'],
                // order: [['id', 'DESC']],
            })
            .then(resolve)
            .catch(reject)
        })
    },

    getAllOrdersDetailOrderedByUser: (userId, type) => {
        return new Promise((resolve, reject) => {
            // db.OrderDetail.findAll({
            //     attributes: ['id', 'Quantity', 'size', 'price'],
            //     include: [
            //         {
            //             model: db.Order,
            //             attributes: ['id', 'OrderDate', 'TotalAmount', 'PaymentMethod', 'ShippingAddress', 'isCancelled', 'ShippingMethods'],
            //             where: {
            //                 isCancelled: false,
            //                 UserID: userId
            //             },
            //             include: [
            //                 {
            //                     model: db.Voucher,
            //                     attributes: ['VoucherValue']
            //                 },
            //                 {
            //                     model: db.User,
            //                     attributes: ['id','FullName']
            //                 },
            //                 {
            //                     model: db.Shipping,
            //                     where: {
            //                         ShippingStatus: type
            //                     },
            //                     attributes: ['id', 'ShippingDate', 'ShippingStatus']
            //                 },
            //                 {
            //                     model: db.Payment,
            //                     attributes: ['PaymentDate', 'PaymentStatus']
            //                 }
            //             ]
            //         }, 
            //         {
            //             model: db.Product,
            //         }
            //     ],
            //     // group: ['id'],
            //     // order: [['id', 'DESC']],
            // })
            db.Order.findAll({
                attributes: ['id', 'OrderDate', 'TotalAmount', 'PaymentMethod', 'ShippingAddress', 'isCancelled', 'ShippingMethods'],
                where: {
                    isCancelled: false,
                    UserID: userId
                },
                include: [
                    {
                        model: db.Product,
                        through: { model: db.OrderDetail, attributes: ['id', 'Quantity', 'size', 'price'], }
                    },
                    {
                        model: db.User,
                        attributes: ['id','FullName', 'PhoneNumber']
                    },
                    {
                        model: db.Shipping,
                        where: {
                            ShippingStatus: type
                        },
                        attributes: ['id', 'ShippingDate', 'ShippingStatus', 'ShippingCost']
                    },
                    // {
                    //     model: db.Payment,
                    //     attributes: ['PaymentDate', 'PaymentStatus']
                    // },
                    {
                        model: db.Voucher,
                        attributes: ['VoucherValue']
                    },
                ],
                // group: ['id'],
                // order: [['id', 'DESC']],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrdersDetailOrderedByUser: (userId, id, type) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                attributes: ['id', 'OrderDate', 'TotalAmount', 'PaymentMethod', 'ShippingAddress', 'isCancelled', 'ShippingMethods'],
                where: {
                    isCancelled: false,
                    UserID: userId,
                    id
                },
                include: [
                    {
                        model: db.Product,
                        through: { model: db.OrderDetail, attributes: ['id', 'Quantity', 'size', 'price'], }
                    },
                    {
                        model: db.User,
                        attributes: ['id','FullName', 'PhoneNumber']
                    },
                    {
                        model: db.Shipping,
                        where: {
                            ShippingStatus: type
                        },
                        attributes: ['id', 'ShippingDate', 'ShippingStatus', 'ShippingCost']
                    },
                    // {
                    //     model: db.Payment,
                    //     attributes: ['PaymentDate', 'PaymentStatus']
                    // },
                    {
                        model: db.Voucher,
                        attributes: ['VoucherValue']
                    },
                ],
                // group: ['id'],
                // order: [['id', 'DESC']],
            })
            .then(resolve)
            .catch(reject)
        })
    },
}

export default orderService
