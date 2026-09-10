import express from "express";
const app = express();
import authRotes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the auth API",
  });
});

app.use("/api/auth", authRotes);

export default app;
