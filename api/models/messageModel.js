import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chats",
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

const Messages = mongoose.model("messages",messageSchema)
export default Messages;
