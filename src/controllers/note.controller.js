const noteModel = require("../models/note.model");

// Get all notes
const getAllNotes = async (req, res, next) => {
    try {
        const notes = await noteModel.find();
        res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        next(error);
    }
};

// Get single note by title
const getNoteByTitle = async (req, res, next) => {
    const title = req.params.title;
    try {
        const note = await noteModel.findOne({ title });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note fetched successfully", note });
    } catch (error) {
        next(error);
    }
};

// Create a new note
const createNote = async (req, res, next) => {
    const data = req.body;
    try {
        const note = await noteModel.create({
            title: data.title,
            description: data.description,
            created_at: new Date()
        });
        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        next(error);
    }
};

// Delete note by ID
const deleteNoteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndDelete(id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully", note });
    } catch (error) {
        next(error);
    }
};

// Update note by ID
const updateNoteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndUpdate(id, req.body, { returnDocument: "after" });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllNotes,
    getNoteByTitle,
    createNote,
    deleteNoteById,
    updateNoteById
};