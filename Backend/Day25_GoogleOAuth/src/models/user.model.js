import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // sparse: password users have no googleId
    email: { type: String, required: true, unique: true, lowercase: true },
    name: String,
    avatar: String,
    password: {
      type: String,
      required: function () {
        return !this.googleId;
        // means if there is googleId then required is false, else it becames true
      },
    }, // only for email/password users
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
