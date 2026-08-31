const NoteModel = require("../models/note.model");

const createNoteController = async (req, res) => {
  try {
    let { title, content, tags } = req.body;

    let newNote = await NoteModel.create({
      title,
      content,
      tags,
    });

    res.status(200).json({
      message: "Note Created!!!",
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allNotes = await NoteModel.find();

    res.status(200).json({
      message: "Got the all Note",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let { id } = req.params;

    let singleNote = await NoteModel.findById(id);

    res.status(200).json({
      message: "Note Fetched!",
      data: singleNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let { id } = req.params;

    await NoteModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note Deleted!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};

const updateNotesController = async (req, res) => {
  try {
    let { id } = req.params;
    let body = req.body;

    let updatedNote = await NoteModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json({
      message: "Note Updated!",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
};

module.exports = {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  deleteNoteController,
  updateNotesController,
};
