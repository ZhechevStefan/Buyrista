const HttpError = require("../error-model/http-error.js");
const productsDbController = require("../dbapp/controllers/products-DBcontroller.js");
const reviewsDbController = require("../dbapp/controllers/reviews-DBcontroller.js");

exports.getAllProducts = async (req, res) => {
  let data;

  data = await productsDbController.getAllProducts();
  data = data.map(product => {
    const productImage = product.imageData.toString("base64");
    product.imageData = productImage;
    return product;
  });

  res.json({ products: data });
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.query.user;

  let product = await productsDbController.getProductById(productId);

  if (!product) {
    const error = new HttpError(
      "Could not find a product for the provided ID.",
      404
    );

    throw error;
  }

  if (userId) {
    let currUserReview = await reviewsDbController.getReviewByUserId(
      userId,
      productId
    );
    product.currUserReview = currUserReview;
  }

  const productImage = product.imageData.toString("base64");
  product.imageData = productImage;

  res.json({ product });
};

exports.getPriceAndQuantityById = async (req, res) => {
  const productsIdsArr = req.params.productsIds.split("_");

  let products = await productsDbController.getPriceAndQuantity(productsIdsArr);

  // if (!products) {
  //   const error = new HttpError(
  //     "Could not find a product for the provided ID.",
  //     404
  //   );

  //   throw error;
  // }

  res.json({ products });
};
