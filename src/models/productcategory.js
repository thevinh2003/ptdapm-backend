'use strict';
import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCategory.belongsTo(models.Product, { foreignKey: 'ProductID', targetKey: 'id' })
      ProductCategory.belongsTo(models.Category, { foreignKey: 'CategoryID', targetKey: 'id' })
    }
  }
  ProductCategory.init({
    ProductID: DataTypes.INTEGER,
    CategoryID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};