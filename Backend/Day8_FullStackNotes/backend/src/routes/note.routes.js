const express = require("express");
const {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  deleteNoteController,
  updateNotesController,
  searchNotesController
} = require("../controllers/note.controller");
const router = express.Router();

router.post("/create", createNoteController);

// search
router.get("/search",searchNotesController)

router.get("/allNotes", getAllNotesController);
router.get("/:id", getSingleNoteController);

router.delete("/:id", deleteNoteController);

router.put("/:id",updateNotesController)



module.exports = router;
