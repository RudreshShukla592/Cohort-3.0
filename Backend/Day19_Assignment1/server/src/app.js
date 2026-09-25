import express from "express";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost/5173",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  console.log(`the error is ${err}`);

  next();
});

export default app;
