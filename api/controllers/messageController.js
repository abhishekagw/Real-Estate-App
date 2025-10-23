import Chats from "../models/chatModel.js";
import Messages from "../models/messageModel.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  const message = req.body.message;
  try {
    const chat = await Chats.findOne({
      _id: chatId,
      user: { $in: [tokenUserId] },
    });
    if (!chat) return res.status(404).json({ message: "Chat not Found" });
    const newMessage = new Messages({
      chats: chatId,
      text: message,
      user: tokenUserId,
    });
    await newMessage.save();
    await Chats.findByIdAndUpdate(
      chatId, { seenBy: [tokenUserId], lastMessage: message }
    );
    await newMessage.populate("user", "username avatar");
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
