"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orderedProducts", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
        primaryKey: true
      },
      productId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        }
      },
      orderId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "orders",
          key: "id"
        }
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        min: 0
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orderedProducts");
  }
};
