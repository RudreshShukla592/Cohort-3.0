import express from "express";
import notesModel from "../models/note.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const isAlreadyInDb = await notesModel.findOne({ title });

    if (isAlreadyInDb) {
      return res.status(400).json({
        error: "note already exist!",
      });
    }

    const newNote = await notesModel.create({
      title,
      description,
      tags,
    });

    res.status(200).json({
      message: "Note Created!!!",
      data: newNote,
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const allNotes = await notesModel.find();

    res.status(200).json({
      message: "All notes are here",
      data: allNotes,
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await notesModel.findById(id);

    res.status(200).json({
      message: "Note Fetched!",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed!!",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await notesModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note Deleted!",
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updateNote = await notesModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json({
      message: "Note Updated!",
      data: updateNote,
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
});

export default router;
