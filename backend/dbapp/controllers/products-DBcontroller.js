const db = require("../models/index.js");

const Product = db.products;

exports.getAllProducts = () => {
  return Product.findAll().then(products => {
    return products;
  });
};
