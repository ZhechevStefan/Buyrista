module.exports = {
  development: {
    host: "10.8.0.2",
    username: "buyrista",
    password: "postgres",
    database: "buyrista",
    dialect: "postgres",
    logging: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
