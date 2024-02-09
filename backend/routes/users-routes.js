const express = require("express");
const { body } = require("express-validator");

const usersController = require("../controllers/users-controllers.js");
const checkAuth = require("../middleware/check-auth.js");
const catchAsync = require("../middleware/catch-async.js");

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 6 })
  ],
  catchAsync(usersController.register)
);

router.post("/login", catchAsync(usersController.login));

router.post("/logout", catchAsync(usersController.logout));

router.get("/login", checkAuth, catchAsync(usersController.isLogged));

router.post("/favourites/:userId", catchAsync(usersController.addFavs));

router.post("/cart/:userId", catchAsync(usersController.addProdToCart));

module.exports = router;
