const Fav = db.favourites;
const Cart = db.carts;

exports.addFavsToDb = async (userId, productsIds) => {
  const favs = [];

  productsIds.map(async productId => {
    await Fav.create({
      userId,
      productId
    });
    favs.push(productId);
  });

  return favs;
};

exports.deleteFavsFromDb = async (userId, productsId) => {
  await Fav.destroy({
    where: {
      userId,
      productsId
    }
  });
};

exports.addProdToDbCart = async (userId, productsIdsAndCount) => {
  const cart = [];

  productsIdsAndCount.map(async product => {
    const { productId, count } = product;
    await Cart.create({
      userId,
      productId,
      count
    });

    cart.push({
      productId,
      count
    });
    console.log(cart);
  });

  return cart;
};

exports.increaseDBCartQty = async (userId, productsIdsAndCount) => {
  productsIdsAndCount.map(async product => {
    await Cart.increment(
      { count: product.count },
      { where: { userId, productId: product.id } }
    );
  });
};
