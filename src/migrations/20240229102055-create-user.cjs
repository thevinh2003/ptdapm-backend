"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9\_\-]+$/,
        },
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
        },
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      FullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^0\d{9}$/,
        },
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UserRoles",
          key: "id",
        },
        defaultValue: 1,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      loginWith: {
        type: Sequelize.ENUM("facebook", "google"),
        allowNull: true,
      },
      socialLoginId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      token: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
