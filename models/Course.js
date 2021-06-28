const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    description: String,
    courseType: {
      type: "String",
      enum: ["freeTrial", "memberOnly"],
      default: "memberOnly",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumbnail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
