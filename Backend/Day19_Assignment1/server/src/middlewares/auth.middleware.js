import userModel from "../models/user.model.js";
import { verifyAccessToken } from "../utils/auth.js";

export const autheticate = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Token not found!",
      });
    }

    const data = verifyAccessToken(accessToken);
    const user = await userModel.findById(data.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
