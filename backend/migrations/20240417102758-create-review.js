"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Review",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          min: 1,
          max: 5
        },
        title: {
          type: DataTypes.TEXT,
          validate: {
            len: [0, 50]
          }
        },
        comment: {
          type: DataTypes.TEXT
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Products",
            key: "id"
          },
          unique: "actions_unique"
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Users",
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
    await queryInterface.dropTable("review");
  }
};
