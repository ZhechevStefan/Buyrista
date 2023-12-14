module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("review", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      min: 0,
      max: 5
    },
    comment: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255]
      }
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Products",
        key: "id"
      }
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  return Reviews;
};
