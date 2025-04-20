import express from "express";
import {
    checkout,
    fetchLecture,
  fetchLectures,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
  paymentVerification,
} from "../controllers/courses.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
//editing the payment later
router.post("/course/checkout/:id", isAuth, checkout);
router.get("/verification/:id", isAuth, paymentVerification);


export default router;
