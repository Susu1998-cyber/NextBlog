import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // 🚀 prevents duplicates
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },

    source: {
      type: String,
      default: "footer", // where user subscribed from
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);
