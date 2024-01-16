const HttpError = require("../error-model/http-error.js");
const usersDbController = require("../dbapp/controllers/users-DBcontroller.js");

const { validationResult } = require("express-validator");

exports.getAllUsers = async (req, res, next) => {
  let data;

  try {
    data = await usersDbController.getAllUsers();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.json({ users: data });
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid field value.", 400);
    return next(error);
  }

  try {
    const productInfo = req.body;
    const imageInfo = req.file;

    const product = {
      name: productInfo.name,
      description: productInfo.description,
      brand: productInfo.brand,
      category: productInfo.category,
      price: productInfo.price,
      countInStock: productInfo.countInStock,
      imageType: imageInfo.mimetype,
      imageName: imageInfo.originalname,
      imageData: imageInfo.buffer
    };

    const data = await productsDbController.createProduct(product);
    res.status(201).json({ product: data });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
