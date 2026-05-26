const express = require("express");
const app = express();

// Middlewares Imports
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

// Routes Imports
const noteRoutes = require("./routes/note.routes");
const postRoutes = require("./routes/post.routes");

// Global Middlewares
app.use(express.json());
app.use(logger);

// Main Routes Injection
app.use("/notes", noteRoutes);
app.use("/post", postRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;