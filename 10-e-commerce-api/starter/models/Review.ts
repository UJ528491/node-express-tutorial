import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a title"],
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
// only 1 review per prodcuct per user
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
