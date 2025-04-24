// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables
const app = express();
// Serve static files (uploads)
app.use("/uploads", express.static("uploads"));
// Middlewares
app.use(cors());
app.use(express.json()); // JSON parser (must come AFTER Stripe webhook)
app.use(express.urlencoded({ extended: false }));

// Importing routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import courseRoute from "./routes/courses.route.js";
import adminRoute from "./routes/admin.route.js";

// Using routes
app.use("/api/products", productRoute);
app.use("/api", userRoute);
app.use("/api", courseRoute);
app.use("/api", adminRoute);

// Root route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Connect to MongoDB
const databasePassword = process.env.MONGO_PASSWORD;
mongoose
  .connect(`mongodb+srv://admin:${databasePassword}@crud-database.p2oubov.mongodb.net/Node-API?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
