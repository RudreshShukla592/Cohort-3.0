import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    like: {
      type: Number,
      default: 0,
      min: 0,
    },

    caption: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("post", postSchema);

export default Post;
