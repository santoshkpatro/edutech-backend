const User = require("../../../models/User");

exports.getUsers = async (req, res) => {
  const { skip = 0, limit = 20 } = req.query;
  try {
    const users = await User.find(null, null, {
      skip: parseInt(skip),
      limit: parseInt(limit),
    }).exec();

    return res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).send("User Not Found!");
    }

    return res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["roles", "membership", "isActive"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).send("User Not Found!");
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId).exec();

    if (!user) {
      res.status(404).send("User Not Found");
    }

    res.send("User Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};
