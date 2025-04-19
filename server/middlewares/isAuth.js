import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  const token = req.headers.token;

  try {
    if (!token)
     return res.status(403).json({
        message: "please login",
      });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};

export const isAdmin = async (req, res, next) => {

    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "You are not an admin",
            });
        }
        
        next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}