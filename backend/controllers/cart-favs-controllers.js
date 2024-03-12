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

  await cartAndFavsDBController.addProdToDbCart(userId, productsIdsAndCount);

  return res.status(200).json("ok");
};

exports.changeQtyInCart = async (req, res) => {
  const userId = req.userData.userId;
  const { productsIdsAndCount } = req.body;
  console.log(productsIdsAndCount);

  await cartAndFavsDBController.changeDBCartQty(userId, productsIdsAndCount);

  return res.status(200).json("ok");
};

exports.deleteProdFromCart = async (req, res) => {
  const userId = req.userData.userId;
  const productId = req.params.productId;

  await cartAndFavsDBController.deleteProdFromDbCart(userId, productId);
};

exports.addFavsAfterLogin = async (userId, oldFavs, reqFavsIds) => {
  let usersSavedFavs = [];
  oldFavs.map(fav => usersSavedFavs.push(fav.productsId));
  reqFavsIds = reqFavsIds.filter(id => usersSavedFavs.includes(id));

  if (reqFavsIds.length > 0) {
    cartAndFavsDBController.addFavsToDb(userId, reqFavsIds);
  }
};

exports.addCartAfterLogin = async (userId, oldCart, reqCartIds) => {
  let usersSavedCartIds = [];
  oldCart.map(item => usersSavedCartIds.push(item.productId));
  let saved = reqCartIds.filter(
    item => !usersSavedCartIds.includes(item.productId)
  );
  let notSaved = reqCartIds.filter(item =>
    usersSavedCartIds.includes(item.productId)
  );
  if (notSaved.length > 0) {
    cartAndFavsDBController.addProdToDbCart(userId, notSaved);
  }
  if (saved.length > 0) {
    cartAndFavsDBController.changeDBCartQty(userId, saved);
  }
};
