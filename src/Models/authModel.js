import mongoose from "mongoose";

// Create User Model Schema:
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Invalid phone number format'],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
