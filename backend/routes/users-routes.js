const express = require("express");
const { body } = require("express-validator");

const usersController = require("../controllers/users-controllers.js");
const cartAndFavsController = require("../controllers/cart-favs-controllers.js");
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

router.post("/logout", checkAuth, catchAsync(usersController.logout));

router.get("/login", checkAuth, catchAsync(usersController.isLogged));

router.post(
  "/favourites",
  checkAuth,
  catchAsync(cartAndFavsController.addFavs)
);

router.delete(
  "/favourites/:productId",
  checkAuth,
  catchAsync(cartAndFavsController.deleteFav)
);

router.post(
  "/cart",
  checkAuth,
  catchAsync(cartAndFavsController.addProdToCart)
);

module.exports = router;
