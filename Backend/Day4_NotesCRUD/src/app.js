const express = require("express");
const NotesModel = require("./models/notes.models");
const connectDb = require("./config/db");
const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("done!, all working");
});

app.post("/create", async (req, res) => {
  try {
    let { title, des } = req.body;

    const newNote = await NotesModel.create({
      title,
      des,
    });

    return res.status(201).json({
      message: "Note created!!",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
