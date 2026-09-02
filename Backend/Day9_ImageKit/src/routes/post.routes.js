import express from "express";
import {createPostController} from "../controllers/post.controller"
const router = express.Router();

router.post("/create",createPostController)

export default router;
