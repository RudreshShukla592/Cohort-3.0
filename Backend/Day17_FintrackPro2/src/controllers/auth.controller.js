import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isAlreadyInDb = await userModel.findOne({ email });

  if (isAlreadyInDb) {
    return res.status(401).json({
      message: "Uer already exist",
      errors: {
        path: "email",
        message: "Uer already exist",
      },
    });
  }
  try {
    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const { accessToken, refreshToken } = generateToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Error occured",
    });
  }
};

export const refreshAllTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refersh token not found",
    });
  }

  try {
    const data = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(data.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
    );

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      message: "Tokens created",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refersh token",
    });
  }
};

export const getMeController = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
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
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found or Invalid Email, Register first",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const { accessToken, refreshToken: newRefreshToken } = generateToken(
    user._id,
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
  });

  user.refreshToken = newRefreshToken;
  await user.save();

  res.status(200).json({
    message: "Login successful",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
    accessToken: accessToken,
  });
};

export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refersh token not found",
    });
  }

  const data = verifyRefreshToken(refreshToken);
  const user = await userModel.findById(data.id);

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logout successful",
  });
};
