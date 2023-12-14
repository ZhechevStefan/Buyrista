const db = require("../models/index.js");

const Review = db.reviews;

exports.createReview = review => {
  return Review.create({
    rating: review.rating,
    comment: review.comment,
    productId: review.productId,
    userId: review.userId
  }).then(review => {
    return review;
  });
};
