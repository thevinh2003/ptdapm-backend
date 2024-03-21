import db from "../models/index.js";

const reportService = {
  // getRevenueReport: async (startDate, endDate) => {
  //   startDate = startDate
  //     ? new Date(startDate)
  //     : new Date() - 30 * 24 * 60 * 60 * 1000;
  //   endDate = endDate ? new Date(endDate) : new Date();
  //   return new Promise((resolve, reject) => {
  //     db.Payment.findAll({
  //       where: {
  //         createdAt: {
  //           [db.Sequelize.Op.between]: [startDate, endDate],
  //         },
  //         PaymentStatus: true,
  //       },
  //       include: [
  //         {
  //           model: db.Order,
  //           attributes: ["TotalAmount", "OrderDate"],
  //         },
  //       ],
  //     })
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // },
  getRevenueReport: async () => {
    // startDate = startDate
    //   ? new Date(startDate)
    //   : new Date() - 30 * 24 * 60 * 60 * 1000;
    // endDate = endDate ? new Date(endDate) : new Date();
    return new Promise((resolve, reject) => {
      db.Payment.findAll({
        attributes: [
          [db.Sequelize.fn('MONTH', db.Sequelize.col('PaymentDate')), 'month'],
        ],
        where: {
          // createdAt: {
          //   [db.Sequelize.Op.between]: [startDate, endDate],
          // },
          PaymentStatus: true,
        },
        include: [
          {
            model: db.Order,
            attributes: ["id", "TotalAmount", "OrderDate"],
            include: [
              {
                model: db.Product,
                attributes: ['StockPrice', 'Price'],
                through: { model: db.OrderDetail, attributes: ['Quantity'] },
              }
            ]
          },
        ],
        raw: true,
        nest: true

      // db.Order.findAll({
      //   attributes: ["id", "TotalAmount", "OrderDate"],
        
      //   include: [
      //     {
      //       model: db.Payment,
      //       attributes: [
      //         [db.Sequelize.fn('MONTH', db.Sequelize.col('PaymentDate')), 'month'],
      //       ],
      //       where: {
      //         // createdAt: {
      //         //   [db.Sequelize.Op.between]: [startDate, endDate],
      //         // },
      //         PaymentStatus: true,
      //       },
      //     },
      //     {
      //       model: db.Product,
      //       attributes: ['StockPrice'],
      //       through: { model: db.OrderDetail },
      //     }
      //   ],
        // raw: true,
        // nest: true
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getProductReport: async () => {
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        include: [
          {
            model: db.ProductReview,
            attributes: ["Review", "Rating", "ReviewDate"],
          },
          {
            model: db.Order,
            attributes: ['id'],
            through: { model: db.OrderDetail },
          }
        ],
        nest: true,
        raw: true
      })
        .then(resolve)
        .catch(reject);
    });
  },

  getOrderReport: async (startDate, endDate) => {
    console.log(startDate, endDate);
    startDate = startDate
      ? new Date(startDate)
      : new Date() - 30 * 24 * 60 * 60 * 1000;
    endDate = endDate ? new Date(endDate) : new Date();
    return new Promise((resolve, reject) => {
      db.Order.findAll({
        // where: {
        //   OrderDate: {
        //     [db.Sequelize.Op.between]: [startDate, endDate],
        //   },
        // },
        attributes: [
          "id",
          "OrderDate",
          "TotalAmount",
          "ShippingAddress",
          "ShippingMethods",
          "isCancelled",
        ],
        where: {
          OrderDate: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: db.Product,
            attributes: ["id", "ProductName", "Price"],
            through: { model: db.OrderDetail },
          },
          {
            model: db.Voucher,
            attributes: ["VoucherName", "VoucherValue"],
          },
          {
            model: db.Shipping,
            attributes: ["id", "ShippingDate", "ShippingStatus"],
          },
          {
            model: db.Payment,
            attributes: ["PaymentDate", "PaymentStatus"],
          },
        ],
        // include: [
        //   {
        //     model: db.OrderDetail,
        //     attributes: ["Quantity", "Price", "TotalPrice"],
        //   },
        // ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getInventoryReport: async () => {
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        attributes: ["ProductName", "StockQuantity"],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getShippingReport: async (startDate, endDate) => {
    startDate = startDate
      ? new Date(startDate)
      : new Date() - 30 * 24 * 60 * 60 * 1000;
    endDate = endDate ? new Date(endDate) : new Date();

    return new Promise((resolve, reject) => {
      db.Shipping.findAll({
        where: {
          ShippingDate: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: db.Order,
            attributes: [
              "OrderDate",
              "TotalAmount",
              "ShippingAddress",
              "ShippingMethods",
            ],
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getRevenueReportToday: async () => {
    const targetDate = new Date()
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0);
    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59);
    return new Promise((resolve, reject) => {
      db.Payment.findAll({
        // attributes: [
        //   [db.Sequelize.fn('MONTH', db.Sequelize.col('PaymentDate')), 'month'],
        // ],
        where: {
          PaymentDate: {
            [db.Sequelize.Op.between]: [startOfDay, endOfDay],
          },
          PaymentStatus: true,
        },
        include: [
          {
            model: db.Order,
            attributes: ["TotalAmount", "OrderDate"],
            include: {
              model: db.Product,
              attributes: ['StockPrice'],
              through: { model: db.OrderDetail },
            }
          },
        ],
        raw: true,
        nest: true
      })
  })},
  getOrderReportByOrderID: async (orderId) => {
    return new Promise((resolve, reject) => {
      db.Order.findOne({
        where: { id: orderId },
        attributes: [
          "id",
          "OrderDate",
          "TotalAmount",
          "ShippingAddress",
          "ShippingMethods",
          "isCancelled",
        ],
        include: [
          {
            model: db.Product,
            attributes: ["id", "ProductName", "Price"],
            through: { model: db.OrderDetail },
          },
          {
            model: db.Voucher,
            attributes: ["VoucherName", "VoucherValue"],
          },
          {
            model: db.Shipping,
            attributes: ["id", "ShippingDate", "ShippingStatus"],
          },
          {
            model: db.Payment,
            attributes: ["PaymentDate", "PaymentStatus"],
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
};

export default reportService;
