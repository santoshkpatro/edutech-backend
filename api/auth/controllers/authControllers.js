const User = require("../../../models/User");
const { generateAccessToken } = require("../../../utils/auth");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email });
    newUser.setPassword(password);

    await newUser.save();

    const token = generateAccessToken({ _id: newUser._id });

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).send("Signup Success");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email, phone }).exec();

    if (!existingUser) {
      res.status(404).send("User not found");
    }

    if (!existingUser.validPassword(password)) {
      res.status(401).send("Invalid Credentials");
    }

    const token = generateAccessToken({ _id: existingUser._id });

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send("Login Success");
  } catch (error) {
    res.send(500).send(error);
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.profile).exec();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
