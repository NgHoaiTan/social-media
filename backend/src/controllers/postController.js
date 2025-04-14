const Post = require('../models/Post');
const postService = require('../services/postService')

const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { caption } = req.body;
        const file = req.file;
        const post = await postService.createPost(userId, caption, file);
        return res.status(201).json({
            message: "Post created successfully",
            post,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        return res.status(200).json({
            message: "Post retrieved successfully",
            post: post
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }


}
const getPosts = async (req, res) => {
    try {
        const requestUserId = req.query.userId;
        const currentUserId = req.userId;
        const targetUserId = requestUserId || currentUserId;

        const posts = await postService.getAllPostsByUserId(targetUserId);
        return res.status(200).json({
            message: "Posts retrieved successfully",
            posts
        })

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const message = await postService.deletePost(postId);
        return res.status(200).json({
            message
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const media = req.file;
        const { caption } = req.body;
        const post = await postService.updatePost(postId, media, caption);
        return res.status(200).json({
            message: "Post updated successfully",
            post
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

}



module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost
}