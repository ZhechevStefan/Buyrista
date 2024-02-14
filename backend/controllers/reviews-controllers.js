const { validationResult } = require("express-validator");

const reviewsDbController = require("../dbapp/controllers/reviews-DBcontroller.js");
const HttpError = require("../error-model/http-error.js");

exports.getRevewsByProductId = async (req, res) => {
  const productId = req.params.productId;
  // the offset is equal to the page number * the number of reviews per page - number of reviews per page
  const reviewOffset = req.query.page * 3 - 3;

  let reviews = await reviewsDbController.getReviewsByProductId(
    productId,
    reviewOffset
  );

  res.json({ reviews });
};

exports.postReview = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid field value.", 400);
    throw error;
  }

  const edit = req.query.edit;
  const productId = req.params.productId;
  const reviewInfo = req.body;
  const userId = req.userData.userId;

  let review = {
    rating: reviewInfo.rating,
    title: reviewInfo.title,
    comment: reviewInfo.comment,
    userId: userId,
    productId: productId
  };

  if (edit) {
    review = await reviewsDbController.updateReview(review);
    review = review[1][0].dataValues;
  } else {
    review = await reviewsDbController.createReview(review);
  }

  res.status(201).json({ review });
};
