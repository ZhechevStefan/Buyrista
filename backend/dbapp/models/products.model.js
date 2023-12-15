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
    imageType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageData: {
      type: DataTypes.BLOB("long"),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(["Electronics", "Accessories", "Others"]),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
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
