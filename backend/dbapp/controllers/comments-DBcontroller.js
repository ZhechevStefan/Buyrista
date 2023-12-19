const db = require("../models/index.js");

const Comment = db.comments;

exports.getCommentsByProductId = async productId => {
  return await Comment.findAll({
    where: {
      productId
    }
  });
};

exports.createComment = async comment => {
  return await Comment.create({
    comment: comment.comment,
    productId: comment.productId,
    userId: comment.userId
  });
};
