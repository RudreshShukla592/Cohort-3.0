import express from "express";
const app = express();
import jwt from "jsonwebtoken";

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the auth API",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  //   SAVE ALL THE DATA TO DB

  const token = jwt.sign(
    {
      email,
      name,
      //  _id
    },
    "50526bdb5bacff23ccadce4d9220332e2750060db96e328628e5d49f02276588d20d09a6",
  );

  res.status(201).json({
    message: "User Created!!",
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
});

export default app;
