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
            message: "Uer already exist",
          },
        ],
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    const { accessToken, refreshToken } = generateToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken,{
      httpOnly: true,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      message: "User registered",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: `The error is ${error}`,
    });
  }
};
