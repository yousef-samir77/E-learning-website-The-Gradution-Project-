import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User already exists",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  user = {
    name,
    email,
    password: hashedPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationtoken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );

  const data = {
    name,
    otp,
  };
  await sendMail(email, "E-learn", data);
  res.status(200).json({
    message: "otp sent to your email",
    activationtoken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationtoken } = req.body;
  const verfiy = jwt.verify(activationtoken, process.env.ACTIVATION_SECRET);

  if (!verfiy) return res.status(400).json({ message: "token expired" });

  if (verfiy.otp !== otp)
    return res.status(400).json({
      message: "Wrong OTP",
    });

  await User.create({
    name: verfiy.user.name,
    email: verfiy.user.email,
    password: verfiy.user.password,
  });
  res.json({
    message: "User Registered Successfully",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "no user with this email",
    });
  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "Wrong Password",
    });

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    res.json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "failed to fetch user",
    });
    
  }
 
});
