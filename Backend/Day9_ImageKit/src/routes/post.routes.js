import express from "express";

import upload from "../config/multer.config.js";
import { createPostController } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", upload.single("image"), createPostController);

export default router;
