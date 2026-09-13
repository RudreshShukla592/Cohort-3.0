import express from "express";
import urlRouter from "./routes/url.route.js";
import urlModel from "./models/url.model.js";

const app = express();

app.use(express.json());
app.use("/api/url", urlRouter);

app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }

  await urlModel.findOneAndUpdate({ shortCode: code }, { $inc: { clicks: 1 } });

  res.redirect(302, url.originalUrl);
});

app.delete("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOneAndDelete({ shortCode: code });

  if (!url) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  res.status(200).json({
    message: "URL deleted successfully",
  });
});

export default app;
