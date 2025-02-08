import express from "express";
import { generateImage } from "../Controllers/GenerateImage.js";
const GenerateImagerouter = express.Router();
GenerateImagerouter.post("/", generateImage);
export default GenerateImagerouter;
