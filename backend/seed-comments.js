const commentsDbController = require("./dbapp/controllers/comments-DBcontroller.js");

// db.sequelize.sync();

const createManyComments = async comments => {
  return comments.map(async comment => {
    const current = await commentsDbController.createComment(comment);
    console.log(current.toJSON());
  });
};

const commentsArr = [
  {
    comment: "It could have been better",
    productId: "35aa6a0b-4306-43ab-ba82-9406cb53ba5f",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  }
];

createManyComments(commentsArr);
