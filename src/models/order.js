"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Voucher, {
        foreignKey: "VoucherID",
        targetKey: "id",
      });
      Order.hasOne(models.Shipping, {
        foreignKey: "OrderID",
      });
      Order.hasOne(models.Payment, {
        foreignKey: "OrderID",
      });
      Order.belongsToMany(models.Product, {
        through: models.OrderDetail,
        foreignKey: "OrderID",
      });
      Order.belongsTo(models.User, { foreignKey: "UserID", targetKey: "id" });
    }
  }
  Order.init(
    {
      UserID: DataTypes.INTEGER,
      VoucherID: DataTypes.INTEGER,
      OrderDate: DataTypes.DATE,
      TotalAmount: DataTypes.DECIMAL,
      PaymentMethod: DataTypes.STRING,
      ShippingAddress: DataTypes.STRING,
      ShippingMethods: DataTypes.STRING,
      isCancelled: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
