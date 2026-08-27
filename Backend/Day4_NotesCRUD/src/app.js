const express = require("express");
const connectDb = require("./config/db");
const createNotesController = require("./controllers/notes.controller");
const notesRoutes = require("./routes/notes.routes");
const NotesModel = require("./models/notes.models");

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("done!, all working");
});

app.use("/notes",notesRoutes)

module.exports = app;
