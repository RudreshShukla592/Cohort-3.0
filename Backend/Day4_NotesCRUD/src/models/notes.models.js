const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
    minlength:[ 10,"Minimum 10 char's required"],
  },
});

const NotesModel = mongoose.model("notes", notesSchema);
module.exports = NotesModel;
