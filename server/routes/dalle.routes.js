import express from 'express';
import * as dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

const response = await fetch(
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  }
);

if (!response.ok) {
  const err = await response.text();
  console.log("HF Error:", err);
  return res.status(400).json({ error: err });
}

const buffer = await response.arrayBuffer();
const image = Buffer.from(buffer).toString("base64");



    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;