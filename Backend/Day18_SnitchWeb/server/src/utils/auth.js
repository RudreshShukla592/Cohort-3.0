import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (userId,role) => {
  const accessToken = jwt.sign(
    {
      id: userId,
      role
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      id: userId,
      role
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return {accessToken,refreshToken}
};

export const verifyRefreshToken = (token)=>{
  const data = jwt.decode(token, config.REFRESH_TOKEN_SECRET)
  return data
}

export const verifyAccessToken = (token)=>{
  const data = jwt.decode(token,config.ACCESS_TOKEN_SECRET)
  return data
}