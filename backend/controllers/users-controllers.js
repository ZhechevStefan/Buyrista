const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../error-model/http-error.js");
const usersDbController = require("../dbapp/controllers/users-DBcontroller.js");
const generateToken = require("../utils/generateToken.js");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(errors.msg, 422);
    return next(error);
  }

  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await usersDbController.getUserByEmail(email);

    if (!user) {
      const name = firstName + " " + lastName;

      let hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = {
        name,
        email,
        password: hashedPassword,
        isAdmin: false
      };

      let user = await usersDbController.createUser(createdUser);

      generateToken(res, user.id);

      res.status(201).json({ user });
    } else {
      const error = new HttpError("Email already registered!", 409);
      next(error);
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await usersDbController.getUserByEmail(email);

    if (!user) {
      const error = new HttpError("Invalid credentials!", 401);
      return next(error);
    }

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new HttpError("Invalid credentials!", 401);
      return next(error);
    }

    generateToken(res, user.id);

    res.status(200).json({ user });
  } catch (err) {
    const error = new HttpError(
      "Could not login, please try again later!",
      500
    );
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("authcookie", "", { httpOnly: true, expires: new Date(0) });
  return res.status(200).json({ message: "Logout succesfull." });
};
