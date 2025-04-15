import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   role : {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    subsscription: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
},
{
 Timestamps: true,
}
);

export const User = mongoose.model("User", Schema);