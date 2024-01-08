const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "1d" });

  res.cookie("authcookie", token, {
    secure: `${process.env.NODE_ENV}` !== "development",
    sameSite: "strict",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
};

module.exports = generateToken;
