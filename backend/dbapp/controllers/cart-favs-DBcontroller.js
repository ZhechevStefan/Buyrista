const db = require("../models/index.js");

const Fav = db.favourites;
const Cart = db.carts;

exports.addFavsToDb = async (userId, productsIds) => {
  const favs = [];

  productsIds.map(async productId => {
    await Fav.create({
      userId,
      productId: productId.id
    });
    favs.push(productId);
  });

  return favs;
};

exports.deleteFavsFromDb = async (userId, productId) => {
  await Fav.destroy({
    where: {
      userId,
      productId
    }
  });
};

exports.addProdToDbCart = async (userId, productsIdsAndCount) => {
  const cart = [];

  productsIdsAndCount.map(async product => {
    const { id, count } = product;
    await Cart.create({
      userId,
      productId: id,
      count
    });

    cart.push({
      productId: id,
      count
    });
    console.log(cart);
  });

  return cart;
};

exports.changeDBCartQty = async (userId, productsIdsAndCount) => {
  productsIdsAndCount.map(async product => {
    await Cart.increment(
      { count: product.count },
      { where: { userId, productId: product.id } }
    );
  });
};

exports.deleteProdFromDbCart = async (userId, productId) => {
  await Cart.destroy({
    where: {
      userId,
      productId
    }
  });
};

exports.deleteAllProductsFromDbCart = async userId => {
  await Cart.destroy({
    where: {
      userId
    }
  });
};
