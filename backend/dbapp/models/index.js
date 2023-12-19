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
db.ratings = require("./ratings.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.products, { through: db.comments });
db.products.belongsToMany(db.users, { through: db.comments });
db.users.belongsToMany(db.products, { through: db.ratings });
db.products.belongsToMany(db.users, { through: db.ratings });

module.exports = db;
