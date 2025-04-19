import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { addLecture, createCourse } from "../controllers/admin.controller.js";
import { uploadFiles } from "../middlewares/multer.middleware.js";

const router = express.Router();
router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLecture);
export default router;
