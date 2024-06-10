import express from "express";
import { authController } from "../Controllers/authController.js";
import Validate from "../Middleware/Validate.js";
import { authValidation } from "../Validations/authValidation.js";

const router = express.Router();

// Register user
router.post(
  "/register",
  Validate(authValidation.registerSchema),
  authController.registerUser
);

// Login user
router.post(
  "/login",
  Validate(authValidation.loginSchema),
  authController.loginUser
);

// Update user
router.put("/user/:id", authController.updateUser);

// Delete user
router.delete("/user/:id", authController.deleteUser);

// Get user
router.get("/user/:id", authController.getUser);

export default {
  route: router,
};
