import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:3,
    maxLength:50
  },
  email: {
    type: String,
    required: true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel
