const NotesModel = require("../models/note.model");

const createNoteController = async (req, res) => {
  try {
    let { title, des } = req.body;

    let newNote = await NotesModel.create({
      title,
      des,
    });

    res.status(200).json({
      message: "Note Created!!!",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allNotes = await NotesModel.find();

    res.status(200).json({
      message: "All Nots required",
      data: allNotes,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let { id } = req.params;

    let singleNote = await NotesModel.findById(id);

    res.status(200).json({
      message: "Note Fetched!",
      data: singleNote,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateNotesController = async (req, res) => {
  try {
    let { id } = req.params;
    let body = req.body;

    let updatedNote = await NotesModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json({
      message: "Note Updated!",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let { id } = req.params;

    await NotesModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note Deleted!!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNoteController,
};
