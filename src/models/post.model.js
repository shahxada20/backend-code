const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    fileId: String,
    file_url: String,
    caption: String,
    filetype: String,
    size: Number,
    created_at: Date
})

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;