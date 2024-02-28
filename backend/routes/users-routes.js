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
  "/orders",
  checkAuth,
  [
    body("contactName").not().isEmpty(),
    body("address").not().isEmpty(),
    body("city").not().isEmpty(),
    body("country").not().isEmpty(),
    body("postalCode").not().isEmpty(),
    body("phoneNumber").not().isEmpty(),
    body("totalPrice").custom(val => val > 0),
    body("paymentMethod").isIn(["Cash On Delivery", "Card Payment"]),
    body("totalPrice").custom(arr => arr.length > 0)
  ],
  catchAsync(usersController.addOrder)
);

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

router.patch(
  "/cart",
  checkAuth,
  catchAsync(cartAndFavsController.changeQtyInCart)
);

router.delete(
  "/cart/:productId",
  checkAuth,
  catchAsync(cartAndFavsController.deleteProdFromCart)
);

module.exports = router;
