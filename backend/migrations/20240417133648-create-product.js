"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      imageType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      imageName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      imageData: {
        type: Sequelize.DataTypes.BLOB("long"),
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.DataTypes.ENUM(["Electronics", "Accessories", "Others"]),
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        min: 0
      },
      countInStock: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        min: 0
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
    await queryInterface.dropTable("products");
  }
};
