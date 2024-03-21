"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartDetail.belongsTo(models.ShoppingCart, {
        foreignKey: "CartId",
        targetKey: "id",
      });
      CartDetail.belongsTo(models.Product, { foreignKey: 'ProductID' })
    }
  }
  CartDetail.init(
    {
      CartId: DataTypes.INTEGER,
      ProductID: DataTypes.INTEGER,
      Size: DataTypes.INTEGER,
      Color: DataTypes.STRING,
      Quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartDetail",
    }
  );
  return CartDetail;
};
