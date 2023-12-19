module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    comment: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255]
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products",
        key: "id"
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  return Comments;
};
