import mongoose from "mongoose";
import productModel from "./src/models/product.model.js";
import { config } from "./src/config/config.js";


const seed = async () => {
  await mongoose.connect(config.MONGO_URI);

  await productModel.insertMany(
    Array.from({ length: 15 }, (_, i) => ({
      title: `Product ${i + 1}`,
      description: `Sample product ${i + 1}`,
      price: { amount: (i + 1) * 100, currency: "INR" },
    }))
  );

  console.log("15 products seeded!");
  await mongoose.disconnect();
};

seed().catch(console.error);