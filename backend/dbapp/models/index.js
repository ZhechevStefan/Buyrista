const { Sequelize } = require("sequelize");

const dbConfig = require("../../config/config-original.js");

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
db.carts = require("./carts.model.js")(sequelize, Sequelize);
db.favourites = require("./favourites.model.js")(sequelize, Sequelize);
db.orders = require("./orders.model.js")(sequelize, Sequelize);
db.orderedProducts = require("./orderedProducts.model.js")(sequelize, Sequelize);
db.deliveryInfo = require("./deliveryInfos.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.products, { through: db.reviews });
db.products.belongsToMany(db.users, { through: db.reviews });
db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users);
db.products.hasMany(db.reviews);
db.reviews.belongsTo(db.products);

db.users.belongsToMany(db.products, { through: db.favourites });
db.products.belongsToMany(db.users, { through: db.favourites });
db.users.hasMany(db.favourites);
db.favourites.belongsTo(db.users);
db.products.hasMany(db.favourites);
db.favourites.belongsTo(db.products);

db.users.belongsToMany(db.products, { through: db.carts });
db.products.belongsToMany(db.users, { through: db.carts });
db.users.hasMany(db.carts);
db.carts.belongsTo(db.users);
db.products.hasMany(db.carts);
db.carts.belongsTo(db.products);

db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

db.orders.belongsToMany(db.products, { through: db.orderedProducts });
db.products.belongsToMany(db.orders, { through: db.orderedProducts });
db.products.hasMany(db.orderedProducts);
db.orderedProducts.belongsTo(db.products);
db.orders.hasMany(db.orderedProducts);
db.orderedProducts.belongsTo(db.orders);

db.users.hasMany(db.deliveryInfo);
db.deliveryInfo.belongsTo(db.users);
db.orders.hasOne(db.deliveryInfo);
db.deliveryInfo.belongsTo(db.orders);

module.exports = db;
