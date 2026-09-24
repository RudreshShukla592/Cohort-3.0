import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateTokens,
  hashToken,
  verifyRefreshToken,
} from "../utils/auth.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    res.status(201).json({
      message: "User has Registered",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: `User already exist`,
      });
    }
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
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

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashToken(refreshToken),
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
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(500).json({
        message: "Refresh Token is required",
      });
    }

    const data = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(data.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (hashToken(refreshToken) !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });
      res.clearCookie("refreshToken");

      return res.status(403).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id.toString(),
    );

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashToken(newRefreshToken),
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
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const getMeController = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const logoutController = async (req, res) => {
  try {
    const { _id } = req.user;

    await userModel.findByIdAndUpdate(_id, { refreshToken: null });

    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "User Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};
