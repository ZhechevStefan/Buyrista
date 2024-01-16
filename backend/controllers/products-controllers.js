const HttpError = require("../error-model/http-error.js");
const productsDbController = require("../dbapp/controllers/products-DBcontroller.js");

exports.getAllProducts = async (req, res, next) => {
  let data;

  try {
    data = await productsDbController.getAllProducts();
    data = data.map(product => {
      const productImage = product.imageData.toString("base64");
      product.imageData = productImage;
      return product;
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.json({ products: data });
};

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    let product = await productsDbController.getProductById(productId);

    if (!product) {
      const error = new HttpError(
        "Could not find a product for the provided ID.",
        404
      );

      return next(error);
    }

    const productImage = product.imageData.toString("base64");
    product.imageData = productImage;

    res.json({ product });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
