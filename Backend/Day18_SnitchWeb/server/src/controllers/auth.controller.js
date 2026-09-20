import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.js";

export const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const isAlreadyInDb = await userModel.findOne({ email });

    if (isAlreadyInDb) {
      return res.status(409).json({
        message: "User already exist",
        errors: [
          {
            path: "email",
            message: "User already exist",
          },
        ],
      });
    }

    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });

    const { accessToken, refreshToken } = generateToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, { refreshToken });

    res.status(201).json({
      message: "User registered",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `The error is ${error}`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.status(200).json({
      message: "User loggedIn",
      data: {
        user: {
          id:user._id,
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `The error is ${error}`,
    });
  }
};

