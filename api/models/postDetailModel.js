import mongoose from "mongoose";

const postDetailsSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  utilities: {
    type: String,
  },
  pet: {
    type: String,
  },
  income: {
    type: String,
  },
  size: {
    type: Number,
  },
  school: {
    type: Number,
  },
  bus: {
    type: Number,
  },
  restaurant: {
    type: Number,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const PostDetails = mongoose.model("PostDetails", postDetailsSchema);
export default PostDetails;
