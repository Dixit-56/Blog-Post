import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Database Connection With MongoDB
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default dbconnect;
