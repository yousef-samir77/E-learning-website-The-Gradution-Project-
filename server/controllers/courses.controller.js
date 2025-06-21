import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.model.js";
import { Lecture } from "../models/Lecture.model.js";
import { Progress } from "../models/Progress.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";


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

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(403).json({
      message: "Please subscribe to the course to access lectures",
    });

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  if (!courses) {
    return res.status(404).json({
      message: "No courses found",
    });
  }
  res.json({
    courses,
  });
});

// Simple controller to add a course to a user's subscription
export const subscribeToCourse = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  if (!course) return res.status(404).json({ message: "Course not found" });

  const isAlreadySubscribed = user.subscription.includes(course._id);
  if (isAlreadySubscribed) {
    return res.status(200).json({ message: "Already subscribed!" });
  }

  user.subscription.push(course._id);
  await Progress.create({
    course:course._id,
    completedLectures:[] ,
    user: user._id,
  });
  await user.save();

  res.status(200).json({ message: "Subscribed successfully!" });
});

export const addProgress = TryCatch(async (req, res) => {
  const { course, lectureId } = req.query;

  if (!course || !lectureId) {
    return res.status(400).json({
      success: false,
      message: "Course ID and Lecture ID are required.",
    });
  }

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (!progress) {
    return res.status(404).json({
      success: false,
      message: "Progress record not found. Please enroll in the course first.",
    });
  }

  if (progress.completedLectures.includes(lectureId)) {
    return res.status(200).json({
      success: true,
      message: "Progress already recorded for this lecture.",
    });
  }

  progress.completedLectures.push(lectureId);
  await progress.save();

  res.status(201).json({
    success: true,
    message: "Lecture progress recorded successfully.",
    completedLectures: progress.completedLectures,
  });
});

export const getYourProgress = TryCatch(async (req, res) => {
  const { course } = req.query;

  if (!course) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required.",
    });
  }

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (!progress) {
    return res.status(404).json({
      success: false,
      message: "No progress found for this course.",
    });
  }

  const allLectures = await Lecture.countDocuments({ course });
  const completedLectures = progress.completedLectures.length;

  const courseProgressPercentage = allLectures > 0
    ? (completedLectures * 100) / allLectures
    : 0;

  res.status(200).json({
    success: true,
    message: "Course progress retrieved successfully.",
    courseProgressPercentage,
    completedLectures,
    allLectures,
    progressDetails: progress,
  });
});


//editing the payment later
