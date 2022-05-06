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
    const { id } = req.params;
    try {
      await isIdValid(id);
      const data = await Post.findById(id);
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
    const { id } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      await checkForPermissionOnPost(id, userId);
      const updatedPost = await Post.findByIdAndUpdate(id, post, {
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
    const { id } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      await checkForPermissionOnPost(id, userId);
      const deletedPost = await Post.findByIdAndRemove(id);
      res.status(200).json({
        message: `Deleting gamory '${deletedPost.title}' successful.`,
      });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async like(req, res) {
    const { id } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(id);
      const post = await Post.findById(id);               //itt csak a likes-ot kell kiszedni es azt objectkent visszaadni updatenel
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

  async comment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    try {
      await isIdValid(id);
      const commentData = new Comment({
        author: req.headers.user.name,
        authorId: req.headers.user.userId,
        comment,
      });
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { comments: commentData } },
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
    throw { status: 400, message: "Invalid id." };

  if (!(await Post.findById(id)))
    throw { status: 404, message: "Gamory does not exist." };
};

const checkForPermissionOnPost = async (id, userId) => {
  const oldPost = await Post.findById(id);
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
