"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DeliveryInfo", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contactName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      billingAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billingName: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("deliveryInfo");
  }
};
