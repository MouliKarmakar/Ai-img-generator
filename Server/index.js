import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import Postsrouter from "./Routes/Posts.js";
import GenerateImagerouter from "./Routes/GenerateImage.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// TO HANDLE ERRORS
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// TO WELCOME THE USER
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API");
});

// ACTONS FOR POSTS
app.use("/api/posts", Postsrouter);
app.use("/api/image", GenerateImagerouter);
// TO CONNECT TO THE DATABASE
const db_uri = process.env.DB_URI;
const functionToConnect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(db_uri)
    .then(() => console.log("Connected to mongodbAtlas"))
    .catch((error) => console.log("faild to connect"));
};

// TO START THE SERVER
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await functionToConnect();
  console.log(`Server is running on port ${port}`);
});
