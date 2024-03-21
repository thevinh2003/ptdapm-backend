import db from  '../models/index.js'
import { Op } from 'sequelize'

const voucherService = {
    createVoucher: (data) => {
        return new Promise((resolve, reject) => {
            db.Voucher.create(data)
            .then(resolve)
            .catch(reject)
        })
    },
    getAllVouchers: () => {
        return new Promise((resolve, reject) => {
            db.Voucher.findAll({ 
                where: {
                    Quantity: {[db.Sequelize.Op.gt]: 0}
                },
                group: ['id'],
                order: [['id', 'DESC']],
                raw: true 
            })
            .then(resolve)
            .catch(reject)
        })
    },
    updateVoucher: (data, id) => {
        return new Promise((resolve, reject) => {
            db.Voucher.update(data, { where: { id }})
            .then(resolve)
            .catch(reject)
        })
    },
    deleteVoucher: (id) => {
        return new Promise((resolve, reject) => {
            db.Voucher.destroy({ where: { id }})
            .then(resolve)
            .catch(reject)
        })
    },
    getVoucherById: (id) => {
        return new Promise((resolve, reject) => {
            db.Voucher.findOne({ where: { id } })
            .then(resolve)
            .catch(reject)
        })
    },
    getAllValidVoucher: () => {
        return new Promise((resolve, reject) => {
            db.Voucher.findAll({
                where: { 
                    Quantity: { [Op.gt] : 0 }
                },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    checkVoucher: (id) => {
        return new Promise((resolve, reject) => {
            db.Voucher.findOne({
                where: { id },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    decrementQuantity: (id) => {
        return new Promise((resolve, reject) => {
          db.Voucher.update(
            { Quantity: db.Sequelize.literal('"Quantity" - 1') },
            { where: { id } }
          )
            .then(resolve(true))
            .catch(reject(false));
        });
      },
}

export default voucherService
