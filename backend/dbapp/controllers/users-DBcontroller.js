const HttpError = require("../../error-model/http-error.js");
const db = require("../models/index.js");

const User = db.users;
const Product = db.products;
const Fav = db.favourites;
const Cart = db.carts;
const Order = db.orders;
const DeliveryInfo = db.deliveryInfo;
const OrderedProduct = db.orderedProducts;

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "isAdmin"]
  });
};

exports.getUserByEmail = async email => {
  return await User.findOne({
    where: {
      email
    },
    include: [
      {
        model: Fav,
        attributes: { exclude: ["userId"] },
        include: {
          model: Product,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        }
      },
      {
        model: Cart,
        attributes: { exclude: ["userId"] },
        include: {
          model: Product,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        }
      }
    ]
  });
};

exports.createUser = async user => {
  return await User.create({
    name: user.name,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
  });
};

exports.addOrder = async order => {
  return await Order.create({
    ...order,
    isComplete: false
  });
};

exports.addDeliveryInfo = async deliveryInfo => {
  // return await DeliveryInfo.create({
  //   country: deliveryInfo.country,
  //   city: deliveryInfo.city,
  //   postalCode: deliveryInfo.postalCode,
  //   address: deliveryInfo.address,
  //   phone: deliveryInfo.phoneNumber,
  //   contactName: deliveryInfo.contactName,
  //   billingAddress: deliveryInfo.billingAddress,
  //   billingName: deliveryInfo.billingName,
  //   userId: deliveryInfo.userId,
  //   orderId: deliveryInfo.orderId
  // });
  return await DeliveryInfo.create(deliveryInfo);
};

exports.addOrderedProducts = async products => {
  return await OrderedProduct.bulkCreate(products);
};
