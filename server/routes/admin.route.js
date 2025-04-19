import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { createCourse } from "../controllers/admin.controller.js";
import { uploadFiles } from "../middlewares/multer.middleware.js";

const router = express.Router();
router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);

export default router;
