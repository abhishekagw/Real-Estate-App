import Post from "../models/postModel.js";
import savedPosts from "../models/savedPost.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorized!" });

  try {
    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updates = {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar }),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();

    const { password: userPassword, ...userInfo } = updatedUser;
    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update User" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorised" });
  try {
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete User" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await Post.find({ user: tokenUserId });
    const saved = await savedPosts.find({ user: tokenUserId }).populate("post");
    const savedPost = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Profile" });
  }
};
