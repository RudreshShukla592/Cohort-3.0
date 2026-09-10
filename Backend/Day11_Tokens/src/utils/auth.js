import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export const generateTokens = ({ userID }) => {
  const accessToken = jwt.sign(
    {
      id: userID,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      id: userID,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return {accessToken,refreshToken}
};

export const verifyAccessToken =  (token)=>{
    const decode = jwt.verify(token,config.ACCESS_TOKEN_SECRET)
    
    return decode
}

export const verifyRefreshToken =  (token)=>{
    const decode = jwt.verify(token,config.REFRESH_TOKEN_SECRET)
    
    return decode
}