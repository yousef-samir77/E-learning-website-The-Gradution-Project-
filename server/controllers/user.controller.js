import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
export const register = async (req, res) => {

    try {
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
            }

            const otp = Math.floor(Math.random() * 1000000);

            const activationtoken = jwt.sign({
                user,
                otp,}, 
                process.env.activation_Secret,
                { expiresIn: "5m" }
            );

            const data = { 
                name,
                otp,
            };
           await sendMail(
            email,
            "E-learn",
            data
           ) 
           res.status(200).json({
            message:"otp sent to your email",
            activationtoken
           })
    } catch (error) {
        res.status(500).json({
             message: error.message 
        });
    }
}