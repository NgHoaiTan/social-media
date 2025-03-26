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
}