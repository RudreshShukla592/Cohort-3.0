import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },
      size: {
        type: String,
        required: true,
        enum: ["XS", "S", "M", "L", "XL"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
