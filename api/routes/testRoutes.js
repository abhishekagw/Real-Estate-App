import express from "express";
import {shouldBeLoggedIn,shouldBeAdmin} from "../controllers/testContoller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/should-be-loggedIn",verifyToken,shouldBeLoggedIn)
router.get("/should-be-admin",shouldBeAdmin)

export default router;