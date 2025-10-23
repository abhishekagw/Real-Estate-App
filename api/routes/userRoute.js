import express from "express";
import { deleteUser, getUser, getUsers, updateUser,profilePosts, getNotification} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",getUsers);
router.get("/search/:id",verifyToken,getUser);
router.put("/:id",verifyToken,updateUser);
router.delete("/:id",verifyToken,deleteUser);
router.get("/profilePosts",verifyToken,profilePosts)
router.get("/notification",verifyToken,getNotification)

export default router;