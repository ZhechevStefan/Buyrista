const HttpError = require("../error-model/http-error.js");
const productsDbController = require("../dbapp/controllers/products-DBcontroller.js");

exports.getAllProducts = async (req, res, next) => {
  let data;

  try {
    data = await productsDbController.getAllProducts();
    const productImage = data.imageData.toString("base64");
    data.imageData = productImage;
  } catch {
    const error = new HttpError(
      "Couldn't load data, please try again later!",
      500
    );
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

exports.createProduct = async (req, res, next) => {
  try {
    const productInfo = req.body;
    const imageInfo = req.file;

    if (
      imageInfo.mimetype !== "jpg" ||
      imageInfo.mimetype !== "jpeg" ||
      imageInfo.mimetype !== "png"
    ) {
      const error = new HttpError(
        "The server supports only .jpg, .jpeg or .png image formats!",
        400
      );
      return next(error);
    }

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
