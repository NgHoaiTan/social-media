const Post = require('../models/Post');
const userService = require('./userService')
const uploadToCloudinary = require('../utils/cloudinaryUtil');

const createPost = async (userId, caption, file) => {
    try {
        console.log(caption)
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
        console.log(newPost)

        return newPost;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    createPost
}