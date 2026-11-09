import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./src/models/auth.model.js";

const TOTAL_USERS = 1000;
const BATCH_SIZE = 500;

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("Test@12345", 10);

    for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_USERS - i);

      const users = Array.from({ length: currentBatchSize }, (_, index) => {
        const userNumber = i + index + 1;

        return {
          name: `Test User ${userNumber}`,
          email: `testuser${userNumber}@example.com`,
          password: hashedPassword,
        };
      });

      await User.insertMany(users, { ordered: false });

      console.log(
        `Inserted ${Math.min(i + currentBatchSize, TOTAL_USERS)} / ${TOTAL_USERS}`,
      );
    }

    console.log("User seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
