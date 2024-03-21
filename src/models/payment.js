"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Order, {
        foreignKey: "OrderID",
        targetKey: "id",
      });
    }
  }
  Payment.init(
    {
      OrderID: DataTypes.INTEGER,
      PaymentDate: DataTypes.DATE,
      PaymentStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};