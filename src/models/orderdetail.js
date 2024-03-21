"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "OrderID",
        targetKey: "id",
      });
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "ProductID",
        targetKey: "id",
      });
    }
  }
  OrderDetail.init(
    {
      OrderID: DataTypes.INTEGER,
      ProductID: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      Price: DataTypes.DECIMAL,
      size: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
