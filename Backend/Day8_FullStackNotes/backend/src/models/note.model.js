const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: [10, "Minimum 10 char's required"],
  },
  tags: {
    type: [String],
    default: [],
  },
});

const NoteModel = mongoose.model("notes", notesSchema);

module.exports = NoteModel;
