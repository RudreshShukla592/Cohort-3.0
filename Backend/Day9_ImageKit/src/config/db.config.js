import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/insta_prj");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
