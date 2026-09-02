import PostModel from "../models/post.model.js";
import { sendFiles } from "../services/storage.service.js";

export const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!caption || !file) {
      return res.status(400).json({
        message: "All Data is required!!",
      });
    }

    console.log(caption,file);
    
    const uploadedPost= await sendFiles(file.buffer,file.originalname)

    const newPost = await PostModel.create({
        caption,
        image:uploadedPost.url
    })

    res.status(201).json({
      message: "Post created",
      data: newPost,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};


