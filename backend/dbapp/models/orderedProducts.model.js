module.exports = (sequelize, DataTypes) => {
  const OrderedProducts = sequelize.define("orderedProduct", {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.fn("gen_random_uuid"),
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders",
        key: "id"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return OrderedProducts;
};
