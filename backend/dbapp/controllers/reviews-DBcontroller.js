const db = require("../models/index.js");

const Review = db.reviews;

exports.getReviewsByProductId = async productId => {
  return await Review.findAll({
    where: {
      productId
    }
  });
};

exports.createReview = async review => {
  return await Review.create({
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    productId: review.productId,
    userId: review.userId
  });
};
