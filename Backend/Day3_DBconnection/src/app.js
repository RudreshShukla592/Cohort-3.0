require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const NotesModel = require("./models/note.model");

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("done!, all working");
});

app.post("/create", async (req, res) => {
  let {title,des} = req.body;
  
  const newNote = await NotesModel.create({
    title,
    des
  })
  
  res.send({
    success:true,
    message:"Note created!!",
    data:newNote  
  });
});

module.exports = app;
