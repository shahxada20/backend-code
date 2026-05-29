const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");

const postController = require("../controllers/post.controller");
const protectRoute = require("../middlewares/auth.middleware");

// Routes Mapping
router.post("/create", protectRoute, upload.single("image"), postController.createPost);
router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.delete("/delete/:id", protectRoute, postController.deletePost);
router.patch("/update/:id", protectRoute, upload.single("image"), postController.updatePost);

module.exports = router;