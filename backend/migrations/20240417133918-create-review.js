"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "reviews",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: queryInterface.sequelize.fn("gen_random_uuid"),
          primaryKey: true
        },
        rating: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          min: 1,
          max: 5
        },
        title: {
          type: Sequelize.DataTypes.TEXT,
          validate: {
            len: [0, 50]
          }
        },
        comment: {
          type: Sequelize.DataTypes.TEXT
        },
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
        validate: {
          bothOrNone() {
            if ((this.title === undefined) !== (this.comment === undefined)) {
              throw new Error("Either both title and comment, or neither.");
            }
          }
        }
      }
    );
    // await queryInterface.addConstraint(tableName, {
    //   fields: ["userId", "deletedAt"],
    //   type: "unique",
    //   name: "unique_user_email"
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reviews");
  }
};
