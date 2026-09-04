import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import userModel from "./models/user.model.js";
import { authenticate } from "./middleware/auth.moddleware.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the auth API",
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  //   SAVE ALL THE DATA TO DB

  const newUser = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "User Created!!",
    data: {
      user: {
        name,
        email,
        id: newUser._id,
      },
      token,
    },
  });
});

app.get("/api/auth/me", authenticate, async (req, res) => {
  const user = req.user;

  res.status(200).json({
    data: {
      user,
    },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(400).json({
      message: "Invalid email or password!",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  
  res.status(201).json({
    message: "User loggedIn!!",
    data: {
      user: {
        email:user.email,
        name:user.name,
      },
      token,
    },
  });
});

export default app;
