const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    created_at: Date
})

const noteModel = mongoose.model("note", noteSchema);
module.exports = noteModel;