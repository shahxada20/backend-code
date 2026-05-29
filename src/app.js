const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Middlewares
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");


// Routes Imports
const noteRoutes = require("./routes/note.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

// Global Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors());

// Main Routes Injection
app.use("/notes", noteRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;