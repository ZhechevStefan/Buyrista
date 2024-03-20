const db = require("../models/index.js");
const HttpError = require("../../error-model/http-error.js");
const { Op } = require("sequelize");

const Product = db.products;
const Review = db.reviews;

exports.getProductsCount = async keyword => {
  let count = null;
  if (keyword) {
    count = await Product.count({
      where: {
        name: {
          [Op.iRegexp]: keyword
        }
      }
    });
  } else {
    count = await Product.count();
  }

  return count;
};

exports.getAllProducts = async (limit, offset, keyword) => {
  let products = null;

  // if (!keyword) {
  //   products = await Product.findAll({
  //     attributes: { exclude: ["description", "updatedAt"] },
  //     include: [
  //       {
  //         model: Review,
  //         attributes: [
  //           [db.Sequelize.fn("avg", db.Sequelize.col("rating")), "rating"]
  //           // [db.Sequelize.fn("count"), db.Sequelize.col("rating"), "ratingCount"]
  //         ]
  //       }
  //     ],
  //     group: ["products.id"],
  //     limit: limit,
  //     offset: offset
  //   });
  // }

  if (!keyword) {
    const [productsArr, metadata] = await db.sequelize.query(`
    SELECT products.id, name, "imageType", "imageName", "imageData", price,
    "countInStock", AVG(rating) AS rating, COUNT(rating) AS "ratingCount" FROM products
     LEFT JOIN reviews ON products.id=reviews."productId"
     GROUP BY products.id
     LIMIT ${limit}
     OFFSET ${offset}`);
    products = productsArr;
  } else {
    const [productsArr, metadata] = await db.sequelize.query(`
    SELECT products.id, name, "imageType", "imageName", "imageData", price,
    "countInStock", AVG(rating) AS rating, COUNT(rating) AS "ratingCount" FROM products
     LEFT JOIN reviews ON products.id=reviews."productId"
     WHERE products.name ~* '${keyword}'
     GROUP BY products.id
     LIMIT ${limit}
     OFFSET ${offset}`);
    products = productsArr;
  }

  return products;
};

exports.getProductById = async productId => {
  // const [product, metadata] = await db.sequelize
  //   .query(`SELECT products.id, name, "imageType", "imageName", "imageData", description,
  //   price, "countInStock", AVG(rating) AS rating, COUNT(rating) AS "ratingCount" FROM products
  //   LEFT JOIN reviews ON products.id=reviews."productId"
  //   WHERE products.id='${productId}'
  //   GROUP BY products.id;`);

  let product = await Product.findOne({
    where: { id: productId },
    include: [
      {
        model: Review,
        attributes: [
          [db.Sequelize.fn("avg", db.Sequelize.col("rating")), "rating"],
          [db.Sequelize.fn("count", db.Sequelize.col("rating")), "ratingCount"]
        ]
      }
    ],
    raw: true,
    group: ["product.id"]
  });

  if (!product) {
    const error = new HttpError(
      "Could not find a product for the provided ID.",
      404
    );

    throw error;
  }

  product = {
    ...product,
    rating: product["reviews.rating"],
    ratingCount: product["reviews.ratingCount"]
  };
  delete product["reviews.rating"];
  delete product["reviews.ratingCount"];

  if (product.rating) {
    product.rating = Math.round(Number(product.rating) * 10) / 10;
    product.ratingCount = Number(product.ratingCount);
  }

  // if (!product[0].rating) {
  //   product[0].rating = Math.round(Number(product[0].rating) * 10) / 10;
  //   product[0].ratingCount = Number(product[0].ratingCount);
  // }

  return product;
};

exports.getPriceAndQuantity = async productsIdArray => {
  let queryString = null;
  if (productsIdArray.length === 1) {
    queryString = `id='${productsIdArray[0]}'`;
  } else {
    queryString = `id='${productsIdArray.shift()}'`;
    productsIdArray.map(id => {
      queryString += ` OR id='${id}'`;
    });
  }

  const [products, metadata] = await db.sequelize
    .query(`SELECT id, price, "countInStock" FROM products
    WHERE ${queryString}`);

  // console.log(products);

  return products;
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

  return { productId: prod.id };
};
