"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
        primaryKey: true
      },
      total: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        min: 0
      },
      isPaid: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      isComplete: {
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
    await queryInterface.dropTable("orders");
  }
};
