"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.UserRole, {
        foreignKey: "RoleId",
        targetKey: "id",
      });
      User.hasMany(models.ProductReview, { foreignKey: "UserID" });
      User.hasMany(models.FavoriteProduct, { foreignKey: "UserID" });
      User.hasMany(models.ShoppingCart, { foreignKey: "UserID" });
      User.hasMany(models.Order, { foreignKey: "UserID" });
      User.hasMany(models.ProductReview, { foreignKey: "UserID" });
    }
  }
  User.init(
    {
      UserName: { type: DataTypes.STRING },
      Password: DataTypes.STRING,
      Email: { type: DataTypes.STRING },
      FullName: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      Address: DataTypes.STRING,
      RoleId: { type: DataTypes.INTEGER },
      loginWith: { type: DataTypes.ENUM("facebook", "google") },
      socialLoginId: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
      token: { type: DataTypes.JSON },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
