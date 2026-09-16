import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Minimum 10 char is required"],
  },
  tags: {
    type: [String],
    default: [],
  },
});

const notesModel = mongoose.model("notes", notesSchema);
export default notesModel;
