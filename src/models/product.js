"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        foreignKey: "ProductID",
      });
      Product.hasMany(models.ProductReview, { foreignKey: "ProductID" });
      Product.hasMany(models.FavoriteProduct, { foreignKey: "ProductID" });
      Product.belongsToMany(models.ShoppingCart, {
        through: models.CartDetail,
        foreignKey: "ProductID",
      });
      Product.belongsToMany(models.Order, {
        through: models.OrderDetail,
        foreignKey: "ProductID",
      });
      Product.hasMany(models.CartDetail, { foreignKey: "ProductID" });
    }
  }
  Product.init(
    {
      ProductName: DataTypes.STRING,
      Description: DataTypes.TEXT,
      Price: DataTypes.DECIMAL,
      StockQuantity: DataTypes.INTEGER,
      SellQuantity: DataTypes.INTEGER,
      Size: DataTypes.JSON,
      Color: DataTypes.STRING,
      PhotoLink: DataTypes.STRING,
      StockPrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
