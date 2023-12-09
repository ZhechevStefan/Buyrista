const HttpError = require("../error-model/http-error.js");
const productsDbController = require("../dbapp/controllers/products-DBcontroller.js");

exports.getAllProducts = async (req, res, next) => {
  let data;

  try {
    data = await productsDbController.getAllProducts();
  } catch {
    const error = new HttpError(
      "Couldn't load data, please try again later!",
      500
    );
    return next(error);
  }

  res.json({ products: data });
};
