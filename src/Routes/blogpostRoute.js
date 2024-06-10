import express from "express";
import { blogpostController } from "../Controllers/blogpostController.js";
import Validate from "../Middleware/Validate.js";
import { blogValidation } from "../Validations/blogpostValidation.js";
import { auth } from "../Middleware/auth.js";
import { isAdmin } from "../Middleware/isAdmin.js";
const router = express.Router();

// Create Blog
router.post(
  "/create",
  auth(),
  isAdmin(),
  Validate(blogValidation.createPostSchema),
  blogpostController.createPost
);

// All Posts
router.get("/all", auth(), blogpostController.getPosts);

// Get Post By-id
router.get("/:id", auth(), blogpostController.getPostById);

// Update Post
router.put(
  "/update/:id",
  auth(),
  isAdmin(),
  Validate(blogValidation.updatePostSchema),
  blogpostController.updatePost
);

// Delete Post
router.delete("/delete/:id", auth(), blogpostController.deletePost);

export default {
  route: router,
};
