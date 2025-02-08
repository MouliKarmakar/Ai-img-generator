import * as dotenv from "dotenv";
import { CreateError } from "../error.js";
import OpenAI from "openai"; // Import OpenAI directly

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // Pass the API key directly
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data[0].b64_json;
    res.status(200).json({ success: true, image });
  } catch (err) {
    next(CreateError(err.status, err.message));
  }
};
