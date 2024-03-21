'use strict';
import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class ProductReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductReview.belongsTo(models.Product, { foreignKey: 'ProductID', targetKey: 'id' })
      ProductReview.belongsTo(models.User, { foreignKey: 'UserID', targetKey: 'id' })
    }
  }
  ProductReview.init({
    UserID: DataTypes.INTEGER,
    ProductID: DataTypes.INTEGER,
    Review: DataTypes.TEXT,
    Rating: DataTypes.INTEGER,
    ReviewDate: DataTypes.DATE,
    Feedback: DataTypes.TEXT,
    FeedbackDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductReview',
  });
  return ProductReview;
};