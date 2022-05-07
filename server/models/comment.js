import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
