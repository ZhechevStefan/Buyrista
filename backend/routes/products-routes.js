const express = require("express");
const { body } = require("express-validator");

const productsController = require("../controllers/products-controllers.js");
const reviewsController = require("../controllers/reviews-controllers.js");
const imageUpload = require("../middleware/file-upload.js");
const HttpError = require("../error-model/http-error.js");
const protect = require("../middleware/check-auth.js");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:productId", productsController.getProductById);

router.get("/reviews/:productId", reviewsController.getRevewsByProductId);

router.post(
  "/upload",
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
  productsController.createProduct
);

router.post(
  "/:productId",
  (req, res, next) => {
    if (!!req.body.comment !== !!req.body.title) {
      const error = new HttpError(
        "Either both title and comment, or neither.",
        400
      );
      next(error);
    } else {
      next();
    }
  },
  [body("rating").isInt({ min: 0, max: 5 }).bail({ level: "request" })],
  reviewsController.postReview
);

module.exports = router;
