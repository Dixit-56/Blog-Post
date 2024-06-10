import Post from "../Models/blogPostModel.js";
import { StatusCode } from "../Service/StatusCode.js";

// CreatePost Api
const createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author: req.user.id,
      tags,
    });
    const createdPost = await post.save();
    StatusCode.sendSuccessResponse(
      res,
      "Post created successfully",
      createdPost
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Get Posts Api
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    StatusCode.sendSuccessResponse(res, "Posts retrieved successfully", posts);
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Get Post By-Id Api
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (post) {
      StatusCode.sendSuccessResponse(res, "Post retrieved successfully", post);
    } else {
      StatusCode.sendNotFoundResponse(res, "Post not found");
    }
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Update Post Api.
const updatePost = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (post) {
      // Check if the user is authorized to update the post
      if (
        post.author.toString() !== req.user.id.toString() &&
        req.user.role !== "admin"
      ) {
        return StatusCode.sendUnauthorizedResponse(res, "Not authorized");
      }

      // Update the post fields
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      post.updatedAt = Date.now();

      // Save the updated post
      const updatedPost = await post.save();

      // Send success response
      StatusCode.sendSuccessResponse(
        res,
        "Post updated successfully",
        updatedPost
      );
    } else {
      // If the post doesn't exist, send a not found response
      StatusCode.sendNotFoundResponse(res, "Post not found");
    }
  } catch (error) {
    console.log(error, "error");
    // If an error occurs, send an internal server error response
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Delete Post Api.
const deletePost = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.author.toString() !== req.user.id.toString()) {
        return StatusCode.sendUnauthorizedResponse(res, "Not authorized");
      }
      await post.deleteOne();
      StatusCode.sendSuccessResponse(res, "Post deleted successfully");
    } else {
      StatusCode.sendNotFoundResponse(res, "Post not found");
    }
  } catch (error) {
    console.log(error, "error");
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

export const blogpostController = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
