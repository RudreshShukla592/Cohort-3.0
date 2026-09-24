import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyRefreshToken } from "../utils/auth.js";

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

    const { accessToken, refreshToken } = generateToken(user._id, user.role);

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
    return res.status(401).json({
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

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
      user.role,
    );

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
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: `The error is ${error}`,
    });
  }
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshController) {
    return res.status(401).json({
      message: "Refresh Token is required",
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
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });

      return res.status(401).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
      user.role,
    );

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    return res.status(200).json({
      message: "Tokens rotated successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: `The error is ${error}`,
    });
  }
};

export const getMeController = async (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    message: "User data fetched successfully",
    data: {
      user: {
        name,
        email,
        id: _id,
      },
    },
  });
};
