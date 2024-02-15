const HttpError = require("../../error-model/http-error.js");
const db = require("../models/index.js");

const User = db.users;
const Product = db.products;
const Fav = db.favourites;
const Cart = db.carts;

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "isAdmin"]
  });
};

exports.getUserByEmail = async email => {
  return await User.findOne({
    where: {
      email
    },
    include: [
      {
        model: Fav,
        attributes: { exclude: ["userId"] },
        include: {
          model: Product,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        }
      },
      {
        model: Cart,
        attributes: { exclude: ["userId"] },
        include: {
          model: Product,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        }
      }
    ]
  });
};

exports.createUser = async user => {
  return await User.create({
    name: user.name,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
  });
};
