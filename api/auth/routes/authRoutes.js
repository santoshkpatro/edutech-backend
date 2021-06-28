const express = require("express");
const { body } = require("express-validator");
const { isAuthenticated } = require("../../../middlewares/auth");
const validate = require("../../../middlewares/common/validate");
const { signup, signin, profile } = require("../controllers/authControllers");

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("phone").isLength({ min: 10, max: 15 }).optional(),
  validate,
  signup
);

router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  validate,
  signin
);

router.get("/profile", isAuthenticated, profile);

module.exports = router;
