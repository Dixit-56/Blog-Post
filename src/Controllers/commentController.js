import Comment from "../Models/commentModel.js";
import Post from "../Models/blogPostModel.js";
import { StatusCode } from "../Service/StatusCode.js";

// Add Comment Api
const addComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return StatusCode.sendNotFoundResponse(res, "Post not found");
    }
    const comment = new Comment({
      content,
      author: req.user.id,
      post: postId,
    });
    const createdComment = await comment.save();
    StatusCode.sendSuccessResponse(
      res,
      "Comment added successfully",
      createdComment
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Get Comment By Post Api
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    StatusCode.sendSuccessResponse(
      res,
      "Comments retrieved successfully",
      comments
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

// Delete Comment Api
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return StatusCode.sendNotFoundResponse(res, "Comment not found");
    }
    if (comment.author.toString() !== req.user.id.toString()) {
      return StatusCode.sendUnauthorizedResponse(res, "Not authorized");
    }
    await comment.deleteOne();
    StatusCode.sendSuccessResponse(res, "Comment removed successfully");
  } catch (error) {
    StatusCode.InternalErrorResponse(res, "Server error");
  }
};

export const commentController = {
  addComment,
  getCommentsByPost,
  deleteComment,
};
