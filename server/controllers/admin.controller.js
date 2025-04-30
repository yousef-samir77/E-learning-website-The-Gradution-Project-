import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.model.js";
import { Lecture } from "../models/Lecture.model.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/user.model.js";
export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: image?.path,
    duration,
    price,
  });

  res.status(201).json({
    message: "Course created successfully",
  });
});

export const addLecture = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "Course not found",
    });

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture created successfully",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted successfully");
  });
  await lecture.deleteOne();
  res.json({
    message: "Lecture deleted successfully",
  });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("Video deleted successfully");
    })
  );

  rm(course.image, () => {
    console.log("Video deleted successfully");
  });

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });
  res.json({
    message: "Course deleted successfully",
  });
});

export const getAllStats = TryCatch(async (req, res) => {
  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  }
  res.status(200).json({
    success: true,
    stats,
  });
});

export const getAllUser = TryCatch(async (req, res) => 
  {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
  
    res.status(200).json({
      success: true,
      users,
    }); 
  })

  export const updateRole = TryCatch(async (req, res) => {
    if (req.body.mainrole !== "superadmin") {
      return res.status(400).json({
        message: "Role must be either admin or user",
      });
    }
    const  user = await User.findById(req.params.id);

    if (user.role === "admin") {
      user.role = "user";
      await user.save();

      return res.status(200).json({
        message: "User role updated to user",
      });
    }
  })