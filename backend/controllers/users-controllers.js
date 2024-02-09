const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../error-model/http-error.js");
const usersDbController = require("../dbapp/controllers/users-DBcontroller.js");
const generateToken = require("../utils/generateToken.js");

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(errors.msg, 422);
    throw error;
  }

  const { firstName, lastName, email, password } = req.body;
  let user = await usersDbController.getUserByEmail(email);

  if (user) {
    const error = new HttpError("Email already registered!", 409);
    throw error;
  }

  const name = firstName + " " + lastName;

  let hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = {
    name,
    email,
    password: hashedPassword,
    isAdmin: false
  };

  user = await usersDbController.createUser(createdUser);

  delete user.dataValues.password;

  generateToken(res, user.id);

  res.status(201).json({ user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await usersDbController.getUserByEmail(email);

  if (!user) {
    const error = new HttpError("Invalid credentials!", 401);
    throw error;
  }

  let isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials!", 401);
    throw error;
  }

  user.dataValues.favourites.map(fav => {
    fav.dataValues.product.imageData =
      fav.dataValues.product.imageData.toString("base64");
  });

  user.dataValues.carts.map(item => {
    item.dataValues.product.imageData =
      item.dataValues.product.imageData.toString("base64");
  });

  delete user.dataValues.password;

  generateToken(res, user.id);

  res.status(200).json({ user });
};

exports.logout = async (req, res) => {
  res.cookie("authcookie", "", { httpOnly: true, expires: new Date(0) });
  return res.status(200).json({ message: "Logout succesfull." });
};

exports.isLogged = async (req, res) => {
  return res.status(200);
};

exports.addFavs = async (req, res) => {
  const userId = req.params.userId;
  const { productsIds } = req.body;

  const favs = await usersDbController.addFavsToDb(userId, productsIds);
  return res.status(200).json(favs);
};

exports.addProdToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productsIdsAndCount } = req.body;

  let cart = await usersDbController.addProdToDbCart(
    userId,
    productsIdsAndCount
  );
  console.log(`------${cart}-------`);
  return res.status(200).json(cart);
};
