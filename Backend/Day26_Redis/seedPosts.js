import "dotenv/config";
import mongoose from "mongoose";

import Post from "./src/models/post.model.js";
import User from "./src/models/auth.model.js";

const TOTAL_POSTS = Number(process.argv[2]) || 100000;
const BATCH_SIZE = 5000;

const captions = [
  "Having a great day!",
  "Learning something new every day.",
  "Consistency is the key.",
  "Building something amazing.",
  "Never stop exploring.",
  "Life is beautiful.",
  "Working on my next project.",
  "Keep pushing forward.",
];

async function seedPosts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    if (TOTAL_POSTS < 1 || TOTAL_POSTS > 1000000) {
      throw new Error("Post count must be between 1 and 1,000,000");
    }

    // Get existing user IDs
    const users = await User.find().select("_id").lean();

    if (!users.length) {
      throw new Error("No users found. Create users first.");
    }

    console.log(`Generating ${TOTAL_POSTS} posts...`);

    for (let i = 0; i < TOTAL_POSTS; i += BATCH_SIZE) {
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_POSTS - i);

      const posts = Array.from({ length: currentBatchSize }, () => {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const createdAt = new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
        );

        return {
          user: randomUser._id,
          like: Math.floor(Math.random() * 10000),
          caption: captions[Math.floor(Math.random() * captions.length)],
          createdAt,
          updatedAt: createdAt,
        };
      });

      await Post.insertMany(posts, { ordered: false });

      console.log(
        `Inserted ${Math.min(i + currentBatchSize, TOTAL_POSTS)} / ${TOTAL_POSTS}`,
      );
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedPosts();
