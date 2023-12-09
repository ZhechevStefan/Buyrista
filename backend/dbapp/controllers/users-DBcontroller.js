const db = require("../models/index.js");

const User = db.users;

exports.getAllUsers = () => {
  return User.findAll({
    attributes: ["id", "name", "email"]
  }).then(users => {
    return users;
  });
};

exports.getUserByEmail = email => {
  return User.findOne({
    where: {
      email: email
    }
  });
};

exports.createUser = user => {
  return User.create({
    name: user.name,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
  }).then(user => {
    return user;
  });
};
