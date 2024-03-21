'use strict';
import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Voucher.hasMany(models.Order, { foreignKey: 'VoucherID' })
    }
  }
  Voucher.init({
    VoucherName: DataTypes.STRING,
    VoucherValue: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};