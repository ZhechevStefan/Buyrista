const express = require("express");
const imageUpload = require("../middleware/file-upload.js");
const protect = require("../middleware/check-auth.js");
const { body } = require("express-validator");

const adminController = require("../controllers/admin-controllers.js");

const router = express.Router();

router.get("/users", adminController.getAllUsers);

router.post(
  "/addproduct",
  imageUpload.single("image"),
  [
    body("name").trim().not().isEmpty().bail({ level: "request" }),
    body("description").not().isEmpty().bail({ level: "request" }),
    body("brand").not().isEmpty().bail({ level: "request" }),
    body("category")
      .isIn(["Electronics", "Accessories", "Others"])
      .bail({ level: "request" }),
    body("price")
      .custom(val => val > 0)
      .bail({ level: "request" }),
    body("countInStock").custom(val => val >= 0)
  ],
  adminController.createProduct
);

module.exports = router;
