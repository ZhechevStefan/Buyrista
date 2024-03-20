const express = require("express");

const productsController = require("../controllers/products-controllers.js");
const catchAsync = require("../middleware/catch-async.js");

const router = express.Router();

router.get("/", catchAsync(productsController.getAllProducts));

router.get("/:productId", catchAsync(productsController.getProductById));

router.get(
  "/store/:productsIds",
  catchAsync(productsController.getPriceAndQuantityById)
);

module.exports = router;
