const postModel = require("../models/post.model");
const uploadFile = require("../services/storage.service");


const createPost = async (req, res, next) => {
    file = req.file;
    // console.log(`Uploaded File Object: {name: ${file.originalname}, type: ${file.mimetype}, size: ${file.size} }`);

    if (!req.file) {
        return res.status(400).json({ message: "Image is required!" });
    }
    try {
        const uploadResponse = await uploadFile.uploadFile(req.file.buffer);
        // console.log(`ImageKit Upload Response: {fileId:  ${uploadResponse.fileId}, size: ${uploadResponse.size}, url ${uploadResponse.url} }`);

        const post = await postModel.create({
            user: req.user._id,
            image: uploadResponse.url,
            caption: req.body.caption,
            created_at: new Date()
        });

        res.status(201).json({ message: "Post created successfully", post });

    } catch (error) {
        next(error);
    }
};


const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
        next(error);
    }
};


const getPostById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post retrieved successfully", post });
    } catch (error) {
        next(error);
    }
};


const deletePost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own posts!" });
        }
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        next(error);
    }
};


const updatePost = async (req, res, next) => {
    const id = req.params.id;
    try {
        let updatedData = { ...req.body };

        if (req.file) {
            const uploadResponse = await uploadFile.uploadFile(req.file.buffer);
            updatedData.image = uploadResponse.url;
            updatedData.created_at = new Date();
        }

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own posts!" });
        }

        const updatedPost = await postModel.findByIdAndUpdate(id, updatedData, { returnDocument: "after" });
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost
}