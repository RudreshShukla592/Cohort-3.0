const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    reuired: true,
  },
  des: {
    type: String,
    reuired: true,
    minlength: [10, "Minimum 10 char's required"],
  },
});

const NotesModel = mongoose.model("notes",notesSchema)
module.exports = NotesModel