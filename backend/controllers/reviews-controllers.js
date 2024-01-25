const { validationResult } = require("express-validator");

const reviewsDbController = require("../dbapp/controllers/reviews-DBcontroller.js");
const HttpError = require("../error-model/http-error.js");

exports.getRevewsByProductId = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    // the offset is equal to the page number * the number of reviews per page - number of reviews per page
    const reviewOffset = req.query.page * 3 - 3;

    let reviews = await reviewsDbController.getReviewsByProductId(
      productId,
      reviewOffset
    );

    res.json({ reviews });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

exports.postReview = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid field value.", 400);
    return next(error);
  }

  try {
    const productId = req.params.productId;
    const reviewInfo = req.body;

    const review = {
      rating: reviewInfo.rating,
      title: reviewInfo.title,
      comment: reviewInfo.comment
    };

    res.status(201).json({ review });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
