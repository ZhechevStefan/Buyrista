"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      ("User",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
        }
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  }
};
