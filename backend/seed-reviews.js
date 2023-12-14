const reviewsDbController = require("./dbapp/controllers/reviews-DBcontroller.js");

// db.sequelize.sync();

const createManyReviews = async reviews => {
  return reviews.map(async rev => {
    const current = await reviewsDbController.createReview(rev);
    console.log(current.toJSON());
  });
};

const reviewsArr = [
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  },
  {
    rating: 5,
    comment: "I like it but if you can't buy the 5.",
    productId: "29bd4769-17eb-49ca-8f17-5983dd031261",
    userId: "48b5290f-a761-47aa-843c-be5d29003835"
  }
];

createManyReviews(reviewsArr);
