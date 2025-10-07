import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

const savedPosts = mongoose.model("savedpost", savedPostSchema);
export default savedPosts;
