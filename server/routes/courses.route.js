import express from "express";
import {
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
  subscribeToCourse,
} from "../controllers/courses.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/subscribe/:id", isAuth, subscribeToCourse);

//editing the payment later
//router.post("/course/stripe-session/:id", isAuth,createStripeSession );
//router.get("/verification/:id", isAuth, paymentVerification);

export default router;
