const db = require("../models/index.js");

const Product = db.products;
const Review = db.reviews;

exports.getAllProducts = async () => {
  const [products, metadata] = await db.sequelize
    .query(`SELECT products.id, name, "imageType", "imageName", "imageData", price, "countInStock", AVG(rating) AS rated, COUNT(rating) AS reviewCount  FROM products
  LEFT JOIN reviews ON products.id=reviews."productId"
  GROUP BY products.id;`);

  return products;
};

exports.getProductById = async productId => {
  const product = await Product.findByPk(productId);
  const [reviews, metadata] = await db.sequelize.query(
    `SELECT AVG(rating) AS rating FROM reviews`
  );

  product.dataValues.rating = Math.round(Number(reviews[0].rating) * 10) / 10;
  return product;
};

exports.createProduct = async product => {
  const prod = await Product.create({
    name: product.name,
    image: product.image,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    countInStock: product.countInStock,
    imageType: product.imageType,
    imageName: product.imageName,
    imageData: product.imageData
  });

  return prod;
};
