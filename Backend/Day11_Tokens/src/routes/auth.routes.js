import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isAlreadyInDb = await userModel.findOne({ email });

    if (isAlreadyInDb) {
      return res.status(400).json({
        message: "Uer already exist",
        errors: {
          path: "email",
          message: "Uer already exist",
        },
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const { accessToken, refreshToken } = generateTokens({
      userID: newUser._id,
    });

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/me", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = verifyAccessToken(accessToken);

    const user = await userModel.findById(decoded.id);

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
    return res.status(401).json({
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
    const decoded =  verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken:newRefreshToken } = generateTokens({
      userID: newUser._id,
    });

    res.cookie("refreshToken",newRefreshToken,{httpOnly:true})

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message:"Token refresh!!",
      accessToken
    })
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refersh token",
    });
  }
});

export default router;
