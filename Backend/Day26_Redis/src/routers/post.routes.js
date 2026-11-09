import express from "express"
import {createPost, getPostDetails} from "../controllers/post.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/", createPost);

router.get("/:postId/details",getPostDetails);

export default router