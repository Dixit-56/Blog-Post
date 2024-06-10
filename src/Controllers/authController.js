import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/authModel.js";
import { StatusCode } from "../Service/StatusCode.js";

// Register User & Admin Api
const registerUser = async (req, res) => {
  try {
    const { username, email, address, phone_no, role, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return StatusCode.conflictWithClient(res, "Email already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      address,
      phone_no,
      role: role || "user", // Default role is user if not provided
      password: hashedPassword,
    });
    StatusCode.sendSuccessResponse(
      res,
      "User registered successfully",
      newUser
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

// Login User & Admin Api
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return StatusCode.sendUnauthorizedResponse(
        res,
        "Invalid email or password"
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return StatusCode.sendUnauthorizedResponse(
        res,
        "Invalid email or password"
      );
    }

    // Generate a token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Determine the response message based on the user's role
    const message =
      existingUser.role === "admin"
        ? "Admin logged in successfully"
        : "User logged in successfully";

    StatusCode.sendSuccessResponse(res, message, { token });
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

// Update User API.
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, address, phone_no, password } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return StatusCode.sendNotFoundResponse(res, "User not found");
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone_no = phone_no || user.phone_no;

    // If a new password is provided, hash it
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    StatusCode.sendSuccessResponse(
      res,
      "User updated successfully",
      updatedUser
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

// Delete User API.
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return StatusCode.notFoundResponse(res, "User not found");
    }

    StatusCode.sendSuccessResponse(res, "User deleted successfully");
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

// Get User API.
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return StatusCode.notFoundResponse(res, "User not found");
    }

    StatusCode.sendSuccessResponse(res, "User retrieved successfully", user);
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

export const authController = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
};
