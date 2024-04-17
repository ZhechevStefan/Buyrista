"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        min: 0
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order");
  }
};
