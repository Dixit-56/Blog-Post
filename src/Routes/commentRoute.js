import express from "express";
import { commentController } from "../Controllers/commentController.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

// Add Comment
router.post("/add/:postId", auth(), commentController.addComment);

// Get Comments By Post
router.get("/all/:postId", auth(), commentController.getCommentsByPost);

// Delete Comment
router.delete("/delete/:id", auth(), commentController.deleteComment);

export default {
  route: router,
};
