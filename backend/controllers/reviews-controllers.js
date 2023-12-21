const reviewsDbController = require("../dbapp/controllers/reviews-DBcontroller.js");
const HttpError = require("../error-model/http-error.js");

exports.getRevewsByProductId = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    let reviews = await reviewsDbController.getReviewsByProductId(productId);

    res.json({ reviews });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
