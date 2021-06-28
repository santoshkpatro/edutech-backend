const Course = require("../../../models/Course");

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().exec();

    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).exec();

    if (!course) {
      res.status(404).send("Course not found!");
    }

    res.send(course);
  } catch (error) {}
};

exports.createCourse = async (req, res) => {
  const { courseName, description, thumbnail } = req.body;

  try {
    const newCourse = new Course({ courseName, description, thumbnail });

    await newCourse.save();

    return res.send("Course Created!");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const existingCourse = await Course.findById(courseId).exec();

    if (!existingCourse) {
      return res.status(404).send("Course Not Found");
    }

    existingCourse = req.body;

    await existingCourse.save();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).exec();

    if (!course) {
      res.status(500).send("Course not found!");
    }

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
