const express = require("express");
const app = express();

// Middlewares Imports
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");

// Middlewares Setup
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(logger);
app.use(cors());

// Routes Imports
const noteRoutes = require("./routes/note.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

// Routes Injection
app.use("/notes", noteRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);

module.exports = app;