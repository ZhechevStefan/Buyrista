const express = require("express");
const imageUpload = require("../middleware/file-upload.js");
const protect = require("../middleware/check-auth.js");
const { body } = require("express-validator");

const adminController = require("../controllers/admin-controllers.js");
const catchAsync = require("../middleware/catch-async.js");

const router = express.Router();

router.get("/users", catchAsync(adminController.getAllUsers));

router.post(
  "/addproduct",
  imageUpload.single("image"),
  [
    body("name").trim().not().isEmpty(),
    body("description").not().isEmpty(),
    body("brand").not().isEmpty(),
    body("category").isIn(["Electronics", "Accessories", "Others"]),
    body("price").custom(val => val > 0),
    body("countInStock").custom(val => val >= 0)
  ],
  catchAsync(adminController.createProduct)
);

module.exports = router;
