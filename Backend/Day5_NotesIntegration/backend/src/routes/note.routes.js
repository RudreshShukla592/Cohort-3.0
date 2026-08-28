const express = require("express");
const {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNoteController,
  updateSingleNoteController
} = require("../controllers/note.controller");

const router = express.Router();

// create api
router.post("/create", createNoteController);

// read api
router.get("/allNotes", getAllNotesController);
router.get("/:id", getSingleNoteController);

// update api
router.put("/:id", updateNotesController);
router.patch("/:id/single",updateSingleNoteController)

// delete api
router.delete("/:id",deleteNoteController)

module.exports = router;
