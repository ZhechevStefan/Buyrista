const db = require("../models/index.js");
const { Op } = require("sequelize");

const Product = db.products;

exports.getProductsCount = async keyword => {
  let count = null;
  if (keyword) {
    count = await Product.findAndCountAll({
      where: {
        name: {
          [Op.iRegexp]: keyword
        }
      }
    });
  } else {
    count = await Product.findAndCountAll();
  }

  return count;
};

exports.getAllProducts = async (offset, keyword) => {
  let products = null;
  if (!keyword) {
    const [products, metadata] = await db.sequelize.query(`
    SELECT products.id, name, "imageType", "imageName", "imageData", price,
    "countInStock", AVG(rating) AS rating, COUNT(rating) AS "ratingCount" FROM products
     LEFT JOIN reviews ON products.id=reviews."productId"
     GROUP BY products.id
     LIMIT 3
     OFFSET ${offset}`);
  }

  return products;
};

exports.getProductById = async productId => {
  const [product, metadata] = await db.sequelize
    .query(`SELECT products.id, name, "imageType", "imageName", "imageData", description, 
    price, "countInStock", AVG(rating) AS rating, COUNT(rating) AS "ratingCount" FROM products
    LEFT JOIN reviews ON products.id=reviews."productId"
    WHERE products.id='${productId}'
    GROUP BY products.id;`);

  if (!product[0].rating) {
    product[0].rating = Math.round(Number(product[0].rating) * 10) / 10;
    product[0].ratingCount = Number(product[0].ratingCount);
  }

  return product[0];
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
