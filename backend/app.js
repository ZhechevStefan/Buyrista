const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const db = require("./dbapp/models");
const HttpError = require("./error-model/http-error.js");
const usersRoutes = require("./routes/users-routes.js");
const productsRoutes = require("./routes/products-routes.js");
const adminRoutes = require("./routes/admin-routes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.get("origin"));
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

db.sequelize.sync();

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

try {
  async () => await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(5000);
  console.log("Listening to port 5000");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
