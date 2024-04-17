"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("deliveryInfos", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
        primaryKey: true
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      contactName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      billingAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      billingName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("deliveryInfos");
  }
};
