const express = require("express");
const { body } = require("express-validator");

const productsController = require("../controllers/products-controllers.js");

const router = express.Router();

router.get("/", productsController.getAllProducts);

module.exports = router;
