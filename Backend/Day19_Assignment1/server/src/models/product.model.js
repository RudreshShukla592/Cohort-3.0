import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
