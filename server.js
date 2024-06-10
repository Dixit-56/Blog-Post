import express from "express";
import dotenv from "dotenv";
import dbconnect from "./src/Config/database.js";
import cors from "cors";
import { index } from "./src/Routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dbconnect();

app.use(express.json());

// Middleware setup
app.use(cors());
app.options("*", cors());

app.use("/auth", index.Auth.route);
app.use("/post", index.Post.route);
app.use("/comment", index.Comment.route);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
