const db = require("../models/index.js");

const User = db.users;

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "isAdmin"]
  });
};

exports.getUserByEmail = async email => {
  return await User.findOne({
    where: {
      email
    }
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
