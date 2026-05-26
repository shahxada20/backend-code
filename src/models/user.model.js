const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, maxlength: 20},
    email: { type: String, unique: true },
    password: { type: String, minlength: 6 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    Created: Date
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;