import express from "express";
import { getAllPosts, createPost } from "../Controllers/Posts.js";
const Postsrouter = express.Router();

Postsrouter.get("/", getAllPosts);
Postsrouter.post("/", createPost);
export default Postsrouter;
