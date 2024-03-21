"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.belongsTo(models.User, {
        foreignKey: "UserID",
        targetKey: "id",
      });
      ShoppingCart.belongsToMany(models.Product, {
        through: models.CartDetail,
        foreignKey: "CartID",
      });
    }
  }
  ShoppingCart.init(
    {
      UserID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShoppingCart",
    }
  );
  return ShoppingCart;
};
