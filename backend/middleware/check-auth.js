const jwt = require("jsonwebtoken");

const HttpError = require("../error-model/http-error.js");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authcookie = req.cookies.authcookie;
    const decodedToken = jwt.verify(authcookie, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    res.clearCookie("authcookie");
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
