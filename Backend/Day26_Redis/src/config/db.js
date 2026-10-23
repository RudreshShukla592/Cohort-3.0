import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
