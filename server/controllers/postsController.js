import mongoose from "mongoose";
import Post from "../models/post.js";

export const postsController = {
  async get(req, res) {
    try {
      const data = await Post.find({}, { authorId: 0 });
      res.status(200).json(data);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async post(req, res) {
    const post = req.body;
    const userId = req.headers.user.userId;
    post.authorId = userId;
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
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      await checkForPermissionOnPost(id, userId);
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
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      await checkForPermissionOnPost(id, userId);
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
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      const post = await Post.findById(id);
      const index = post.likes.findIndex((id) => id === String(userId));
      if (index === -1) {
        post.likes.push(userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(userId));
      }
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
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

const checkForPermissionOnPost = async (id, userId) => {
  const oldPost = await Post.findById(id);
  if (oldPost.authorId !== userId)
    throw { status: 401, message: "No permission to perform any operation on this post." };
  return;
};
