import Post from "../models/postModel.js";
import PostDetails from "../models/postDetailModel.js";
import e from "express";
import savedPosts from "../models/savedPost.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  const { city, type, property, bedroom, minPrice, maxPrice } = query;
  const filter = {
    ...(city && { city: { $regex: new RegExp(`^${city}$`, "i") } }),
    ...(type && { Type: type }),
    ...(property && { property }),
    ...(bedroom && { bedroom: Number(bedroom) }),
  };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gt = Number(minPrice);
    if (maxPrice) filter.price.$lt = Number(maxPrice);
  }

  try {
    const posts = await Post.find(filter);
    setTimeout(() => {
      res.status(201).json(posts);
    }, 1000);
    console.log(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const singlePost = await PostDetails.findOne({ postId: id }).populate({
      path: "postId",
      populate: { path: "user", select: "username avatar" },
    });

    const token = req.cookies.token;
    if (!token)res.status(200).json({ ...singlePost.toObject(), isSaved: false,message:"failed" });
      jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
        if (!error) {
          const savedPost = await savedPosts.findOne({
            user: payload.id,
            post: id,
          });
          return res.status(200).json({...singlePost.toObject(), isSaved: savedPost ? true : false,message:"sucess"});
        }
        return res.status(200).json({...singlePost,isSaved:false})
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  const postData = {
    ...body.postData,
    user: tokenUserId,
  };

  try {
    const newPost = new Post(postData);
    const savedPost = await newPost.save();
    const postDetails = {
      ...body.postDetails,
      postId: savedPost._id,
    };
    const newPostDetails = new PostDetails(postDetails);
    const savedDetails = await newPostDetails.save();

    const savedInfo = savedPost.toObject();
    const { _id: fullPostId, ...savedDetailsInfo } = savedDetails.toObject();
    const fullPost = {
      ...savedInfo,
      ...savedDetailsInfo,
      fullPostId,
    };
    res.status(200).json({ message: "Post Added Succesfully", post: fullPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add Posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update Posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await Post.findById({ _id: id });
    if (!post.user == tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await Post.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Post Deleted Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete Posts" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.id;
  const userId = req.userId;
  try {
    const saved = await savedPosts.findOne({
      user: userId,
      post: postId,
    });

    if (saved) {
      await savedPosts.deleteOne({
        user: userId,
        post: postId,
      });
      res.status(200).json({ message: "Post Unsaved" });
    } else {
      const savedPost = new savedPosts({
        user: userId,
        post: postId,
      });
      await savedPost.save();
      res.status(200).json({ message: "Post Saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Save Post" });
  }
};
