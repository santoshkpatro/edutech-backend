const express = require("express");
const {
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { isAuthenticated, isAdmin } = require("../../../middlewares/auth");
const { body } = require("express-validator");

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getUsers);

router.get("/:userId", isAuthenticated, isAdmin, getUserDetails);

router.patch(
  "/:userId",
  isAuthenticated,
  isAdmin,
  body("phone").isLength({ min: 10, max: 15 }).optional(),
  body("isActive").isBoolean().optional(),
  body("roles").isArray().optional(),
  updateUser
);

router.delete("/:userId", isAuthenticated, isAdmin, deleteUser);

module.exports = router;
