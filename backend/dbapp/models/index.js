const { Sequelize } = require("sequelize");

const dbConfig = require("../db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.reviews = require("./reviews.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.products, { through: db.reviews });
db.products.belongsToMany(db.users, { through: db.reviews });
db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users);
db.products.hasMany(db.reviews);
db.reviews.belongsTo(db.products);

// User.hasMany(Grant);
// Grant.belongsTo(User);
// Profile.hasMany(Grant);
// Grant.belongsTo(Profile);

module.exports = db;
