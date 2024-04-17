module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    "cart",
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
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
      timestamps: false
    }
  );

  return Carts;
};
