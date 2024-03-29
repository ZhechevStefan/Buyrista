module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      min: 0
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Orders;
};
