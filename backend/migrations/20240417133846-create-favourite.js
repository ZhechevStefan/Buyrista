"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "favourites",
      {
        productId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "products",
            key: "id"
          },
          unique: "actions_unique"
        },
        userId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id"
          },
          unique: "actions_unique"
        }
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["productId", "userId"]
          }
        },
        timestamps: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("favourites");
  }
};
