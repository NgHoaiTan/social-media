const Post = require('../models/Post');
const userService = require('./userService')
const mongoose = require('mongoose')
const uploadToCloudinary = require('../utils/cloudinaryUtil');

const createPost = async (userId, caption, file) => {
    try {
        let mediaUrl = null;
        let mediaType = null;
        if (file) {
            const uploadResult = await uploadToCloudinary(file, null, {
                folder: "user_posts"
            })
            mediaUrl = uploadResult.secure_url;
            mediaType = file.mimetype.startsWith('video') ? 'video' : 'image';
        }
        const newPost = await Post.create({
            caption,
            mediaUrl,
            mediaType,
            author: userId,
        })
        const user = await userService.getUserById(userId);
        user.posts.push(newPost._id);
        await user.save();

        return newPost;
    } catch (error) {
        throw error;
    }

}

const getPostById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid Post ID format");
    }

    const post = await Post.findById(id)
        .populate('author', 'username email')
        .populate('likes', 'username');
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
}

const getAllPostsByUserId = async (userId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new Error("Invalid user ID format");
    }

    const posts = await Post.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate('likes', 'username')
        .populate('share', 'username')
        .populate({
            path: 'comments',
            populate: { path: 'author', select: 'username' }
        });
    return posts;
}

module.exports = {
    createPost,
    getPostById,
    getAllPostsByUserId
}