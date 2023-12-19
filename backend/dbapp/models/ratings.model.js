module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    "rating",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      rating: {
        type: DataTypes.INTEGER,
        min: 1,
        max: 5
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "id"
        },
        unique: "actions_unique"
      },
      userId: {
        type: DataTypes.UUID,
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
      }
    }
  );

  return Ratings;
};
