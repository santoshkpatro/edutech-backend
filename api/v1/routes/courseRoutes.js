const express = require("express");
const { isAuthenticated, isAdmin } = require("../../../middlewares/auth");
const validate = require("../../../middlewares/common/validate");
const {
  getAllCourse,
  createCourse,
  getCourseDetails,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseControllers");

const router = express.Router();

router.get("/", isAuthenticated, getAllCourse);

router.get("/:courseId", isAuthenticated, getCourseDetails);

router.post("/", isAuthenticated, isAdmin, validate, createCourse);

router.put("/:courseId", isAuthenticated, isAdmin, validate, updateCourse);

router.delete("/:courseId", isAuthenticated, isAdmin, validate, deleteCourse);

module.exports = router;
