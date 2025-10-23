import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDB.js";
import dotenv from "dotenv";

import postRouter from "./routes/postRoute.js";
import authRouter from "./routes/authRoute.js";
import testRoute from "./routes/testRoutes.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import messageRouter from "./routes/messageRoute.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.listen(8500, () => {
  connectToMongoDb();
  console.log("server is running");
});
