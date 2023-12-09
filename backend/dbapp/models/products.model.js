module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 300]
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      isIn: [["Electronics", "Accessories", "Others"]],
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(2),
      allowNull: false,
      min: 0
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 0
    }
  });

  return Products;
};
