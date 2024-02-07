const HttpError = require("../../error-model/http-error.js");
const db = require("../models/index.js");

const User = db.users;
const Favs = db.favourites;
const Cart = dv.Cart;

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "isAdmin"]
  });
};

exports.getUserByEmail = async email => {
  return await User.findOne({
    where: {
      email
    }
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

exports.addFavsToDb = async (userId, productsIds) => {
  const favs = [];
  try {
    productsIds.map(async productId => {
      await Favs.create({
        userId,
        productId
      });
      favs.push(productId);
    });
  } catch (err) {
    throw err;
  }

  return favs;
};

exports.addProdToDbCart = async (userId, productsIds) => {
  const cart = [];
  try {
    productsIds.map(async productId => {
      await Cart.create({
        userId,
        productId
      });
      cart.push(productId);
    });
  } catch (err) {
    throw err;
  }

  return cart;
};
