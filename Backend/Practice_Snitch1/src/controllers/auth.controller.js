import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { createTokens, verifyRefreshToken } from "../utils/auth.js";

export const registerController = async (req, res) => {
  try {
    const { email, name, passowrd } = req.body;

    const isAlreadyInDb = await userModel.find({ emal });

    if (isAlreadyInDb) {
      return res.status(409).json({
        message: "User Already Exist",
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
      password: await bcrypt.hash(passowrd, 12),
    });

    const { accessToken, refreshToken } = createTokens(user._id, user.role);

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
    console.log(error);
    res.status(401).json({
      message: "Server Error",
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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = createTokens(
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
    console.log(error);
    res.status(401).json({
      message: "Server Error",
    });
  }
};

export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
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

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });
      res.clearCookie("refreshToken");

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
    console.log(error);
    res.status(401).json({
      message: "Server Error",
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
