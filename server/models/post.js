import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
