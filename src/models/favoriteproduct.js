'use strict';
import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class FavoriteProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavoriteProduct.belongsTo(models.Product, { foreignKey: 'ProductID', targetKey: 'id' })
      FavoriteProduct.belongsTo(models.User, { foreignKey: 'UserID', targetKey: 'id' })
    }
  }
  FavoriteProduct.init({
    UserID: DataTypes.INTEGER,
    ProductID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteProduct',
  });
  return FavoriteProduct;
};