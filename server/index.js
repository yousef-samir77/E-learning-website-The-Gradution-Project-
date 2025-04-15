// new project
import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/api/products", productRoute);
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
    console.log("connected");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(() => {
    console.log("failed");
  });
