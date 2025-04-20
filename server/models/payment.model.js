import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", schema);