const mongoose = require('mongoose');
const Comment = require('./Comment')

const postSchema = new mongoose.Schema({
    caption: { type: String, default: '' },
    mediaUrl: { type: String, default: '' },
    mediaType: { type: String, enum: ['image', 'video'] },
    publicId: { type: String, default: null },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    share: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]

}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post;