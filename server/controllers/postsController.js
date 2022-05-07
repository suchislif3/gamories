import mongoose from "mongoose";
import Post from "../models/post.js";
import { Comment } from "../models/comment.js";

export const postsController = {
  async get(req, res) {
    const { startId } = req.query;
    try {
      const nPerPage = 6;
      const data = await Post.find(startId ? { _id: { $lt: startId } } : {})
        .sort({ _id: -1 })
        .limit(nPerPage);
      res.status(200).json(data);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    const { id: postId } = req.params;
    try {
      await isIdValid(postId);
      const data = await Post.findById(postId);
      res.status(200).json(data);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async getBySearch(req, res) {
    try {
      const { searchTerm, tags } = req.query;
      const searchTermRegExp = new RegExp(searchTerm, "i");

      const data = await Post.find({
        $or: [
          { title: searchTermRegExp },
          { description: searchTermRegExp },
          { tags: { $in: tags.split(",") } },
        ],
      }).sort({ createdAt: -1 });
      res.status(200).json(data);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async post(req, res) {
    const post = req.body;
    if (post.tags) post["tags"] = convertTagsIntoArray(post.tags);

    try {
      const newPost = new Post({
        ...post,
        author: req.headers.user.name,
        authorId: req.headers.user.userId,
      });
      await newPost.save();
      res.status(200).json({
        message: `Creating gamory '${post?.title}' successful.`,
        post: newPost,
      });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async patch(req, res) {
    const post = req.body;
    if (post.tags && typeof post.tags === "string") {
      post["tags"] = convertTagsIntoArray(post.tags);
    }
    const { id: postId } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(postId);
      await checkForPermissionOnPost(postId, userId);
      const updatedPost = await Post.findByIdAndUpdate(postId, post, {
        new: true,
      });
      res.status(200).json({
        message: `Updating gamory '${post?.title}' successful.`,
        post: updatedPost,
      });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    const { id: postId } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(postId);
      await checkForPermissionOnPost(postId, userId);
      const deletedPost = await Post.findByIdAndRemove(postId);
      res.status(200).json({
        message: `Deleting gamory '${deletedPost.title}' successful.`,
      });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async like(req, res) {
    const { id: postId } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(postId);
      const postLikes = await Post.findById(postId, {likes: 1}); 
      const index = postLikes.likes.findIndex((id) => id === String(userId));
      if (index === -1) {
        postLikes.likes.push(userId);
      } else {
        postLikes.likes = postLikes.likes.filter((id) => id !== String(userId));
      }
      const updatedPost = await Post.findByIdAndUpdate(postId, postLikes, { new: true });
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async comment(req, res) {
    const { id: postId } = req.params;
    const { comment } = req.body;
    try {
      await isIdValid(postId);
      const commentData = new Comment({
        author: req.headers.user.name,
        authorId: req.headers.user.userId,
        comment,
      });
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: commentData } },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};

const isIdValid = async (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId))
    throw { status: 400, message: "Invalid id." };

  if (!(await Post.findById(postId)))
    throw { status: 404, message: "Gamory does not exist." };
};

const checkForPermissionOnPost = async (postId, userId) => {
  const oldPost = await Post.findById(postId);
  if (oldPost.authorId !== userId)
    throw {
      status: 401,
      message: "No permission to perform any operation on this post.",
    };
  return;
};

const convertTagsIntoArray = (string) => {
  return string.replace(/\s+/g, "").split(",");
};
