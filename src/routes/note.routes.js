const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

// Routes Mapping
router.get("/all", noteController.getAllNotes);
router.get("/:title", noteController.getNoteByTitle);
router.post("/", noteController.createNote);
router.delete("/delete/:id", noteController.deleteNoteById);
router.patch("/update/:id", noteController.updateNoteById);

module.exports = router;