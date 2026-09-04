import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import userModel from "./models/user.model.js";
import { authenticate } from "./middleware/auth.moddleware.js";

import bcrypt from "bcryptjs";
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the auth API",
  });
});



export default app;
