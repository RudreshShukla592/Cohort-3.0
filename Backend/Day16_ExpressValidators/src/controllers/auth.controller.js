import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
  const { email, phone, password } = req.body;

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

  const user = await userModel.create({
    email,
    phone,
    passwordHash: await bcrypt.hash(password,10)
  })


};
