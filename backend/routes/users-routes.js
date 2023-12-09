const express = require("express");
const { body } = require("express-validator");

const usersController = require("../controllers/users-controllers.js");

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 6 })
  ],
  usersController.register
);

router.post("/login", usersController.login);

module.exports = router;
