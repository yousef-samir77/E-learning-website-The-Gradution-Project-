// new project
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import cors from "cors";
const app = express();
dotenv.config();
// edit the payment later
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
app.use("/uploads", express.static("uploads"));

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// importing routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import courseRoute from "./routes/courses.route.js";
import adminRoute from "./routes/admin.route.js";
// using routes
app.use("/api/products", productRoute);
app.use("/api", userRoute);
app.use("/api", courseRoute);
app.use("/api", adminRoute);

// mongo password
const databasePassword = process.env.MONGO_PASSWORD;
app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(
    `mongodb+srv://admin:${databasePassword}@crud-database.p2oubov.mongodb.net/Node-API?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(() => {
    console.log("failed");
  });
