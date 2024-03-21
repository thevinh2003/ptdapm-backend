"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shipping.hasOne(models.Order, {
        foreignKey: "OrderID",
        targetKey: "id",
      });
    }
  }
  Shipping.init(
    {
      OrderID: DataTypes.STRING,
      ShippingDate: DataTypes.DATE,
      ShippingStatus: DataTypes.STRING,
      ShippingCost: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
