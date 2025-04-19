import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.model.js";
import { Lecture } from "../models/Lecture.model.js";
import { User } from "../models/user.model.js";

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }
  res.json({
    course,
  });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);
  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(403).json({
      message: "Please subscribe to the course to access lectures",
    });

   res.json({ lectures });
});


