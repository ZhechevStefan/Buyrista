const ratingsDbController = require("./dbapp/controllers/ratings-DBcontroller.js");

// db.sequelize.sync();

const createManyRatings = async ratings => {
  return ratings.map(async rating => {
    const current = await ratingsDbController.createReview(rating);
    console.log(current.toJSON());
  });
};

const ratingsArr = [
  // {
  //   rating: "5",
  //   productId: "71da300f-6800-4888-8331-9c330ef44a09",
  //   userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  // },
  // {
  //   rating: "4",
  //   productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
  //   userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  // },
  // {
  //   rating: "4",
  //   productId: "a7648ea0-8381-4cdf-bb2b-de242f47287a",
  //   userId: "172efd41-f7d5-4d80-bf52-5ab5a975058c"
  // },
  {
    rating: "3",
    productId: "35aa6a0b-4306-43ab-ba82-9406cb53ba5f",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "4",
    productId: "3a889c34-6159-49e2-8cb9-98dad849427f",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "4",
    productId: "71da300f-6800-4888-8331-9c330ef44a09",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "2",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "5",
    productId: "a7648ea0-8381-4cdf-bb2b-de242f47287a",
    userId: "17c8b3bd-3a38-4da0-a72a-ffdb8b9aa76c"
  },
  {
    rating: "2",
    productId: "35aa6a0b-4306-43ab-ba82-9406cb53ba5f",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  },
  {
    rating: "4",
    productId: "a7648ea0-8381-4cdf-bb2b-de242f47287a",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  },
  {
    rating: "5",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  },
  {
    rating: "5",
    productId: "71da300f-6800-4888-8331-9c330ef44a09",
    userId: "30cb91d9-1863-4084-aba0-0617b3924fba"
  },
  {
    rating: "4",
    productId: "71da300f-6800-4888-8331-9c330ef44a09",
    userId: "5557333b-3d74-4e0d-90ba-d9e77a91526c"
  },
  {
    rating: "1",
    productId: "849d781b-5c6f-4de0-aac2-bc25a580e78a",
    userId: "5557333b-3d74-4e0d-90ba-d9e77a91526c"
  },
  {
    rating: "4",
    productId: "a7648ea0-8381-4cdf-bb2b-de242f47287a",
    userId: "5557333b-3d74-4e0d-90ba-d9e77a91526c"
  }
];

createManyRatings(ratingsArr);
