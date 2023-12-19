const db = require("../models/index.js");

const Rating = db.ratings;

exports.createReview = rating => {
  return Rating.create({
    rating: rating.rating,
    productId: rating.productId,
    userId: rating.userId
  }).then(rating => {
    return rating;
  });
};
