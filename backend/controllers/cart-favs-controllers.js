const cartAndFavsDBController = require("../dbapp/controllers/cart-favs-DBcontroller.js");

exports.addFavs = async (req, res) => {
  const userId = req.userData.userId;
  const { productsIds } = req.body;

  const favs = await cartAndFavsDBController.addFavsToDb(userId, productsIds);
  return res.status(200).json(favs);
};

exports.deleteFav = async (req, res) => {
  const userId = req.userData.userId;
  const productId = req.params.productId;

  await cartAndFavsDBController.deleteFavsFromDb(userId, productId);
};

exports.addProdToCart = async (req, res) => {
  const userId = req.userData.userId;
  const { productsIdsAndCount } = req.body;

  let cart = await cartAndFavsDBController.addProdToDbCart(
    userId,
    productsIdsAndCount
  );
  console.log(`------${cart}-------`);
  return res.status(200).json(cart);
};

exports.addFavsAfterLogin = async (userId, oldFavs, reqFavsIds) => {
  let usersSavedFavs = [];
  oldFavs.map(fav => usersSavedFavs.push(fav.productsId));
  reqFavsIds = reqFavsIds.filter(id => !usersSavedFavs.includes(id));
  cartAndFavsDBController.addFavsToDb(userId, reqFavsIds);
};

exports.addCartAfterLogin = async (userId, oldCart, reqCartIds) => {
  let usersSavedCart = [];
  oldCart.map(item => usersSavedCart.push(item.productId));
  let saved = oldCart.filter(item => usersSavedCart.includes(item.productId));
  let notSaved = reqCartIds.filter(
    item => !usersSavedCart.includes(item.productId)
  );
  cartAndFavsDBController.addProdToDbCart(userId, notSaved);
  cartAndFavsDBController.increaseDBCartQty(userId, saved);
};
