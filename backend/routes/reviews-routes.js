const express = require("express");
const { body } = require("express-validator");

const reviewsController = require("../controllers/reviews-controllers.js");
const catchAsync = require("../middleware/catch-async.js");
const checkAuth = require("../middleware/check-auth.js");
const HttpError = require("../error-model/http-error.js");

const router = express.Router();

router.get("/:productId", catchAsync(reviewsController.getRevewsByProductId));

router.post(
  "/:productId",
  checkAuth,
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
  [body("rating").isInt({ min: 0, max: 5 })],
  catchAsync(reviewsController.postReview)
);

module.exports = router;
