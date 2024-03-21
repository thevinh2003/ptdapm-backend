import db from '../models/index.js'

const paymentService = {
    createPayment: (data) => {
        return new Promise((resolve, reject) => {
            db.Payment.create(data)
            .then(resolve)
            .catch(reject)
        })
    },
    updatePaymentStatusByOrderID: ({orderId, status}) => {
        return new Promise((resolve, reject) => {
            db.Payment.update({ PaymentStatus: status, PaymentDate: new Date() }, {
                where: {
                    OrderID: orderId
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },

  createPayment: (data) => {
    return new Promise((resolve, reject) => {
      db.Payment.create(data).then(resolve).catch(reject);
    });
  },
  updatePaymentStatusByOrderID: ({ orderId, status }) => {
    return new Promise((resolve, reject) => {
      db.Payment.update(
        { PaymentStatus: status, PaymentDate: new Date() },
        {
          where: {
            OrderID: orderId,
          },
        }
      )
        .then(resolve)
        .catch(reject);
    });
  },
  getPaymentByOrderID: (orderId) => {
    return new Promise((resolve, reject) => {
      db.Payment.findOne({
        where: {
          OrderID: orderId,
        },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  deletePaymentByOrderID: (orderId) => {
    return new Promise((resolve, reject) => {
      db.Payment.destroy({
        where: {
          OrderID: orderId,
        },
      })
        .then(resolve)
        .catch(reject);
    });
  },
}
export default paymentService;
