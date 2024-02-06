module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define(
    "favourite",
    {
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
      timestamps: false
    }
  );

  return Favourites;
};
