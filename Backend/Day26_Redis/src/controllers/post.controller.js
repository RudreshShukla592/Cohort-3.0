import config from "../config/config.js";
import Post from "../models/post.model.js";
import { Redis } from "ioredis";

const redis = new Redis(config.REDIS_CLI);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (error) => {
  console.log("Redis connection error:", error);
});

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    const post = await Post.create({
      user: req.user._id,
      caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/posts/:postId/details
export const getPostDetails = async (req, res) => {
  try {
    const { postId } = req.params;

    const cachedPost = await redis.get(`post:${postId}`);

    // redis by default store data in string format!!
    if (cachedPost) {
      return res.status(200).json({
        message: "Post fetched successfully",
        data: JSON.parse(cachedPost),
      });
    }

    const post = await Post.findById(postId).populate("user", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    await redis.set(`post:${postId}`,JSON.stringify(post))

    return res.status(200).json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
