const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNoteController
} = require("../controllers/notes.controller");

const router = express.Router();

// create api
router.post("/create", createNotesController);

// read api
router.get("/allNotes", getAllNotesController);
router.get("/:id",getSingleNoteController)

// update api
router.put("/:id",updateNotesController)

// delete api
router.delete("/:id",deleteNoteController)

module.exports = router;
