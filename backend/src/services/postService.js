const Post = require('../models/Post');
const userService = require('./userService')
const mongoose = require('mongoose')

const User = require('../models/User');
const Comment = require('../models/Comment')
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUtil');

const createPost = async (userId, caption, file) => {
    try {
        let mediaUrl = null;
        let mediaType = null;
        let publicId = null;
        if (file) {
            const uploadResult = await uploadToCloudinary(file, null, {
                folder: "user_posts"
            })
            mediaUrl = uploadResult.secure_url;
            mediaType = file.mimetype.startsWith('video') ? 'video' : 'image';
            publicId = uploadResult.public_id;
        }
        const newPost = await Post.create({
            caption,
            mediaUrl,
            mediaType,
            publicId,
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

const deletePost = async (postId) => {
    try {
        if (!mongoose.isValidObjectId(postId)) {
            throw new Error("Invalid post ID format");
        }
        // Cập nhật user: Xóa postId khỏi mảng posts của user
        await User.updateMany({ posts: postId }, { $pull: { posts: postId } });
        await Comment.deleteMany({ post: postId });


        const post = await Post.findByIdAndDelete(postId);
        await deleteFromCloudinary(post.publicId);
        if (!post) {
            throw new Error("Post not found");
        }
        return "Post deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    createPost,
    getPostById,
    getAllPostsByUserId,
    deletePost
}