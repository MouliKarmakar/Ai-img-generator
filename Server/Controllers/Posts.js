import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Post from "../Models/PostSchema.js";
import { CreateError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USERNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, posts });
  } catch (err) {
    next(CreateError(err.status, err.message));
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = Post.create({ name, prompt, photo: photoUrl?.secure_url });
    res.status(201).json({ success: true, newPost });
  } catch (err) {
    next(CreateError(err.status, err.message));
  }
};
