const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies["token"] || "";

  if (!token) {
    res.status(400).send("Authentication failed!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.profile = decoded._id;
  } catch (error) {
    res.status(500).send("Invalid Token");
  }

  next();
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.profile).exec();

  if (!user.roles.includes("admin")) {
    res.status(401).send("Authorization failed!");
  }

  next();
};
