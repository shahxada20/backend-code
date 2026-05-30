const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "artist"], default: "user" },
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;