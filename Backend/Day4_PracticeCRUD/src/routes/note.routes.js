const express = require("express");
const {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNoteController
} = require("../controllers/note.controller");

const router = express.Router();

router.post("/create", createNoteController);

router.get("/allNotes", getAllNotesController);
router.get("/:id", getSingleNoteController);

router.put("/:id", updateNotesController);

router.delete("/:id",deleteNoteController)

module.exports = router;
