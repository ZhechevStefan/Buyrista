module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.fn("gen_random_uuid"),
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
          model: "products",
          key: "id"
        },
        unique: "actions_unique"
      },
      userId: {
        type: DataTypes.UUID,
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

  return Reviews;
};
