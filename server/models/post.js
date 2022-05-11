import mongoose from "mongoose";
import { commentSchema } from "./comment.js";
import { imageSchema } from "./image.js";

const postSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    game: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    tags: [String],
    image: {
      type: imageSchema,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
