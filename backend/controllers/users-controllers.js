const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../error-model/http-error.js");
const usersDbController = require("../dbapp/controllers/users-DBcontroller.js");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs! Please check your data!", 422);
    return next(error);
  }

  const { firstName, lastName, email, password } = req.body;
  checkEmail(email, next);
  console.log(`------------------${password}----------------------`);

  const name = firstName + " " + lastName;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash("123456", 10);
    console.log(`------------------${hashedPassword}----------------------`);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  const createdUser = {
    name,
    email,
    password: hashedPassword,
    isAdmin: false
  };

  let user;
  try {
    user = await usersDbController.createUser(createdUser);
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(201).json({ userId: user.id, email: user.email });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await usersDbController.getUserByEmail(email);
  } catch (err) {
    const error = new HttpError(
      "Could not login, please try again later!",
      500
    );
    return next(error);
  }

  if (user === null) {
    const error = new HttpError("Invalid credentials!", 401);
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not login, please try again later!",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials!", 403);
    return next(error);
  }

  res.json({ userId: user.id, email: user.email });
};

async function checkEmail(email, next) {
  let user;
  try {
    user = await usersDbController.getUserByEmail(email);
  } catch (err) {
    const error = new HttpError(
      "Could not register, please try again later!",
      500
    );
    return next(error);
  }

  if (user) {
    const error = new HttpError("Email is already in use", 409);
    return next(error);
  }
}
