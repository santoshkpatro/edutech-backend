const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
