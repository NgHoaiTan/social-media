const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const addComment = async (postId, userId, text) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const comment = new Comment({
            author: userId,
            text,
            post: postId
        });
        post.comments.push(comment._id);
        await comment.save();
        await post.save();
        return comment;
    } catch (error) {
        throw new Error('Error adding comment: ' + error.message);
    }
}

module.exports = {
    addComment
}