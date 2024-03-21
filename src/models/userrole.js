'use strict';

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.hasMany(models.User, { foreignKey: 'RoleId' })
    }
  }
  UserRole.init({
    RoleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};