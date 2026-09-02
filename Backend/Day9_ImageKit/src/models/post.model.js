import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      // String --> it is cdn/url in form of JSON
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const PostModel = mongoose.model("posts", postSchema);
export default PostModel;
