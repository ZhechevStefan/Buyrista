"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.fn("now")
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.fn("now")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};

const timestampDefaults = queryInterface => {
  return {
    createdAt: {
      type: queryInterface.sequelize.Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: queryInterface.sequelize.fn("now")
    },
    updatedAt: {
      type: queryInterface.sequelize.Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: queryInterface.sequelize.fn("now")
    },
    deletedAt: {
      type: queryInterface.sequelize.Sequelize.DataTypes.DATE,
      allowNull: true
    }
  };
};
