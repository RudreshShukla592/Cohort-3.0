import Redis from "ioredis";
import config from "./config.js";

const redis = new Redis(config.REDIS_CLI);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (error) => {
  console.log("Redis connection error:", error);
});

export default redis;