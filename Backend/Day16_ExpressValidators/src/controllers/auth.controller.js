import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, phone, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Invalid email address.",
    });
  }

  if (!phone) {
    errors.push({
      field: "phone",
      message: "Phone number is required",
    });
  }

  const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    errors.push({
      field: "phone",
      message: "Invalid Phone number.",
    });
  }

  if (!password && !password.trim()) {
    errors.push({
      field: "pasword",
      message: "Password is required",
    });
  }

  if (password.trim().length < 6) {
    errors.push({
      field: "password",
      message: "Password must contain minimum 6 character",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid request",
      errors,
    });
  }

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
    passwordHash: await bcrypt.hash(password, 10),
  });

  res.status(200).json({
    message: "Registered!",
    data: {
      email,
      phone,
      id: user._id,
    },
  });
};
