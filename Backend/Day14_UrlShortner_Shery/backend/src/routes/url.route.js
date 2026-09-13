import express from "express";
import { generateCode } from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is too Long",
    });
  }

  const code = generateCode();

  try {
    const newUrl = await urlModel.create({
      originalUrl: url,
      shortCode: code,
      clicks: 0,
    });

    res.status(200).json({
      message: "URL Shortened Successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const urls = await urlModel.find();

    res.status(200).json({
      message: "All URL Shortened Successfully",
      data: {
        urls,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});



export default router;
