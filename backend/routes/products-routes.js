const express = require("express");
const { body } = require("express-validator");

const productsController = require("../controllers/products-controllers.js");
const imageUpload = require("../middleware/file-upload.js");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:productId", productsController.getProductById);

router.get("/comments/:productId", productsController.getCommentsByProductId);

router.post(
  "/upload",
  imageUpload.single("image"),
  [
    body("name").trim().not().isEmpty(),
    body("description").not().isEmpty(),
    body("brand").not().isEmpty(),
    body("category").isIn(["Electronics", "Accessories", "Others"]),
    body("price").custom(val => val > 0),
    body("countInStock").custom(val => val >= 0)
  ],
  productsController.createProduct
);

module.exports = router;
