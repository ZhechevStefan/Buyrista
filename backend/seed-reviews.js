const reviewsDbController = require("./dbapp/controllers/reviews-DBcontroller.js");

// db.sequelize.sync();

const createManyReviews = async reviews => {
  return reviews.map(async review => {
    const current = await reviewsDbController.createReview(review);
    console.log(current.toJSON());
  });
};

const reviewsArr = [
  {
    rating: "4",
    title: "Test Title",
    comment: "Test Comment",
    productId: "3a889c34-6159-49e2-8cb9-98dad849427f",
    userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  },
  {
    rating: "5",
    title: "Test Title",
    comment: "Test Comment",
    productId: "71da300f-6800-4888-8331-9c330ef44a09",
    userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  },
  {
    rating: "2",
    title: "Test Title",
    comment: "Test Comment",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  },
  {
    rating: "4",
    title: "Test Title",
    comment: "Test Comment",
    productId: "a7648ea0-8381-4cdf-bb2b-de242f47287a",
    userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  },
  {
    rating: "5",
    title: "Test Title",
    comment: "Test Comment",
    productId: "3a889c34-6159-49e2-8cb9-98dad849427f",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "3",
    title: "Test Title",
    comment: "Test Comment",
    productId: "71da300f-6800-4888-8331-9c330ef44a09",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "2",
    title: "Test Title",
    comment: "Test Comment",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "1",
    title: "Test Title",
    comment: "Test Comment",
    productId: "3a889c34-6159-49e2-8cb9-98dad849427f",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  },
  {
    rating: "5",
    title: "Test Title",
    comment: "Test Comment",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  }
];

createManyReviews(reviewsArr);
