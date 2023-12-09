const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../dbapp/models/index");

const HttpError = require("../error-model/http-error.js");
const usersDbController = require("../dbapp/controllers/users-DBcontroller.js");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs! Please check your data!", 422);
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

      res.status(201).json({ userId: user.id, email: user.email });
    } else {
      const error = new HttpError("Email already registered!", 409);
      next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Could not register, please try again later!",
      500
    );
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
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

    res.json({ userId: user.id, email: user.email });
  } catch (err) {
    const error = new HttpError(
      "Could not login, please try again later!",
      500
    );
    return next(error);
  }
};
