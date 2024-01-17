const express = require("express");
const { body } = require("express-validator");

const productsController = require("../controllers/products-controllers.js");
const reviewsController = require("../controllers/reviews-controllers.js");
const HttpError = require("../error-model/http-error.js");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:productId", productsController.getProductById);

router.get("/reviews/:productId", reviewsController.getRevewsByProductId);

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
