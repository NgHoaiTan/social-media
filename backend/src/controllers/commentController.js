const commentService = require('../services/commentService');
const addComment = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.userId;
    const text = req.body.text;
    try {
        const comment = await commentService.addComment(postId, userId, text);
        return res.status(201).json({
            message: 'Comment added successfully',
            comment,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }

}
module.exports = {
    addComment
}
