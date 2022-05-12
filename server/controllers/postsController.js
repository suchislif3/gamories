import mongoose from "mongoose";
import Post from "../models/post.js";
import { Comment } from "../models/comment.js";
import * as cloudinaryAPI from "../api/cloudinary.js";

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
    const { searchTerm, tags } = req.query;
    try {
      const searchTermRegExp = new RegExp(searchTerm, "i");
      const data = await Post.find({
        $or: [
          { author: searchTermRegExp },
          { game: searchTermRegExp },
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
    const { post, base64Image } = req.body;
    try {
      if (post.tags) post["tags"] = convertTagsIntoArray(post.tags);
      if (base64Image) {
        const imageUploadResponse = await cloudinaryAPI.uploadImage(
          base64Image
        );
        console.log("Image uploaded");
        console.log(imageUploadResponse);
        post.image = {
          publicId: imageUploadResponse?.public_id,
          url: imageUploadResponse?.secure_url,
        };
      }
      const newPost = new Post({
        ...post,
        author: req.headers.user.name,
        authorId: req.headers.user.userId,
      });
      const savedPost = await newPost.save();
      console.log("post created");
      console.log(savedPost);
      res.status(200).json({
        message: `Creating gamory '${post?.title}' successful.`,
        post: savedPost,
      });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async patch(req, res) {
    const { id: postId } = req.params;
    const userId = req.headers.user.userId;
    const { post, base64Image } = req.body;
    try {
      await isIdValid(postId);
      await checkForPermissionOnPost(postId, userId);
      if (post.tags && typeof post.tags === "string") {
        post["tags"] = convertTagsIntoArray(post.tags);
      }
      let oldImage = post.image;
      if (base64Image) {
        const imageUploadResponse = await cloudinaryAPI.uploadImage(
          base64Image
        );
        console.log("New image uploaded");
        console.log(imageUploadResponse);
        post.image = {
          publicId: imageUploadResponse?.public_id,
          url: imageUploadResponse?.secure_url,
        };
      }
      const updatedPost = await Post.findByIdAndUpdate(postId, post, {
        new: true,
      });
      console.log("post updated");
      console.log(updatedPost);
      if (base64Image && oldImage.publicId) {
        const imageDeleteResponse = await cloudinaryAPI.deleteImage(
          oldImage.publicId
        );
        console.log(
          `delete image ${oldImage.publicId}`,
          imageDeleteResponse
        );
      }
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
      console.log("post deleted", deletedPost);
      if (deletedPost?.image?.publicId) {
        const imageDeleteResponse = await cloudinaryAPI.deleteImage(
          deletedPost.image.publicId
        );
        console.log(
          `delete image ${deletedPost.image.publicId}`,
          imageDeleteResponse
        );
      }
      res.status(200).json({
        message: `Deleting gamory '${deletedPost.title}' successful.`,
      });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async like(req, res) {
    const { id: postId } = req.params;
    const userId = req.headers.user.userId;
    try {
      await isIdValid(postId);
      const postLikes = await Post.findById(postId, { likes: 1 });
      const index = postLikes.likes.findIndex((id) => id === String(userId));
      if (index === -1) {
        postLikes.likes.push(userId);
      } else {
        postLikes.likes = postLikes.likes.filter((id) => id !== String(userId));
      }
      const updatedPost = await Post.findByIdAndUpdate(postId, postLikes, {
        new: true,
      });
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
