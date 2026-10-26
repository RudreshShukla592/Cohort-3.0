import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,           // 15 minutes(in ms)
  limit: 5,                           // 5 failed attempts per IP per window
  message: { message: "Too many login attempts. Try again in 1 minutes." },
});

app.get("/login",loginLimiter, (req, res) => {
  res.send("Login is Happening here")
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
