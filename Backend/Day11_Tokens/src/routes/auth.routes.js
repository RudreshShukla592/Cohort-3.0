import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { generateTokens } from "../utils/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isAlreadyInDb = await userModel.findOne({email})

    if(isAlreadyInDb){
        return res.status(400).json({
            message:"Uer already exist",
            errors:{
                path:"email",
                message:"Uer already exist",
            }
        })
    }

    const newUser = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const {accessToken,refreshToken} = generateTokens({userID:newUser._id})
  } catch (error) {
    console.log(error);
  }
});

export default router;
