import mongoose from "mongoose";
import Post from "../models/post.js";

export const postsController = {
  async get(req, res) {
    try {
      const data = await Post.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async post(req, res) {
    const post = req.body;
    const newPost = new Post(post);
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async patch(req, res) {
    const post = req.body;
    const { id } = req.params;
    try {
      await isIdValid(id);
      const updatedPost = await Post.findByIdAndUpdate(id, post, {
        new: true,
      });
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await isIdValid(id);
      const deletedPost = await Post.findByIdAndRemove(id);
      res.status(200).json({
        message: `Post '${deletedPost.title}' successfully deleted.`,
      });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async likePost(req, res) {
    const { id } = req.params;
    try {
      await isIdValid(id);
      const post = await Post.findById(id);
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};

const isIdValid = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw { status: 400, message: "Update failed, invalid id" };

  if (!(await Post.findById(id)))
    throw { status: 400, message: "Update failed, post does not exist" };
};
