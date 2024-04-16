module.exports = {
  host: "10.8.0.2",
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  DB: `${process.env.DB_NAME}`,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
