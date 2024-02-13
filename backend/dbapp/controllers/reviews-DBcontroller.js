const db = require("../models/index.js");

const Review = db.reviews;
// const User = db.users;

exports.getReviewsByProductId = async (productId, offset) => {
  const [reviews, metadata] = await db.sequelize.query(
    `SELECT reviews.id, rating, title, comment, "userId", reviews."createdAt", users.name FROM reviews 
    JOIN users ON users.id=reviews."userId"
    WHERE reviews."productId"='${productId}' 
    ORDER BY reviews."createdAt" DESC 
    LIMIT 3 
    OFFSET ${offset}`
  );

  return reviews;
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

exports.updateReview = async review => {
  return await Review.update(
    {
      rating: review.rating,
      title: review.title,
      comment: review.comment
    },
    {
      where: {
        userId: review.userId,
        productId: review.productId
      }
    }
  );
};

exports.getReviewByUserId = async (userId, productId) => {
  return await Review.findOne({
    where: {
      userId,
      productId
    }
  });
};
