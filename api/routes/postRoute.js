import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, savePost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",verifyToken,addPost);
router.put("/:id",verifyToken,updatePost);
router.delete("/:id",verifyToken,deletePost);
router.post("/save",verifyToken,savePost);


export default router;