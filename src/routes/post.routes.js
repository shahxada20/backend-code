const express = require("express");
const router = express.Router();
const multer = require("multer");

const postController = require("../controllers/post.controller");

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// Routes Mapping
router.post("/", upload.single("image"), postController.createPost);
router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.delete("/delete/:id", postController.deletePost);
router.patch("/update/:id", upload.single("image"), postController.updatePost);

module.exports = router;