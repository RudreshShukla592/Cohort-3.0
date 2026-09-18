import express from "express";
import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyInDB = await userModel.findOne({ email });

  if (isUserAlreadyInDB) {
    return res.status(401).json({
      message: "Uer already exist",
      errors: {
        path: "email",
        message: "Uer already exist",
      },
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const { accessToken, refreshToken } = generateTokens(user._id);

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    message: "User registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
    accessToken: accessToken,
  });
});

router.get("/me", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    const data = verifyAccessToken(accessToken);
    const user = await userModel.findById(data.id);

    res.status(200).json({
      message: "user fetched!!",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refersh token not found",
    });
  }

  try {
    const data = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(data.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken  } = generateTokens(user._id);

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: "Tokens created",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refersh token",
    });
  }
});

export default router;
