import PostModel from "../models/post.model";

const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    const newPost = await PostModel({
        caption, image
    })

    res.status(200).json({
        message:"Post created",
        data:newPost
    })
  } catch (error) {
    return res.status(500).json({
        message:"Failed!!"
    })
  }
};

export default { createPostController };
