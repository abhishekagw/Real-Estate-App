import Chats from "../models/chatModel.js";
import Messages from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await Chats.find({ user: tokenUserId }).lean();

    for (const chat of chats){
      const receiverId = chat.user.find((id)=> id.toString()!==tokenUserId.toString())
      const receiver = await User.findOne({_id:receiverId}).select("username avatar");
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Chats" });
  }
};

export const getChat = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    await Chats.updateOne(
      { _id: id },
      { $addToSet: { seenBy: tokenUserId } },
      { new: true }
    );
    const chat = await Chats.findOne({
      _id: id,
      user: tokenUserId,
    });
    const messages = await Messages.find({ chats: id })
      .sort({ createdAt: 1 })
      .populate("user", "username avatar");

    res.status(200).json({ ...chat.toObject(), messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chat" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const recieverId = req.body.recieverId;
  try {
    const newChat = new Chats({
      user: [tokenUserId, recieverId],
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add chat" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  try {
    const seenChat = await Chats.findByIdAndUpdate(
      { _id: chatId, users: { $in: [tokenUserId] } },
      { $addToSet: { seenBy: tokenUserId } },
      { new: true }
    );
    res.status(200).json(seenChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Readchat" });
  }
};
