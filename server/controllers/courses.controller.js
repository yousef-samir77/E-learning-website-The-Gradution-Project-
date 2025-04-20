import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.model.js";
import { Lecture } from "../models/Lecture.model.js";
import { Payment } from "../models/payment.model.js";
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

  if (!user.subscription.includes(req.params.id))
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
//editing the payment later

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }
  if (user.subscription.includes(course._id)) {
    return res.status(403).json({
      message: "Already subscribed",
    });
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "EGP",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    order,
    course,
  });
});
//editing the payment later

export const paymentVerification = TryCatch(async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === signature;

  if (condition) {
    await Payment.create({
      order_id,
      payment_id,
      signature,
    });

    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);

    await user.save();
    res.status(200).json({
      message: "Payment Successful",
      user,
    });
  } else {
    return res.status(500).json({
      message: "Invalid Signature",
    });
  }
});
