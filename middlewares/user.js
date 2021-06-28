const User = require("../models/User");

exports.getUserById = async (req, res, next, userId) => {
  const user = await User.findById(userId).exec();

  if (!user) {
    res.status(404).send("Failed to load user");
  }

  req.user = user;

  next();
};
