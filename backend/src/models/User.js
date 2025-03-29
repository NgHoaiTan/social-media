const mongoose = require('mongoose');
const passport = require('passport');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String, required: function () {
            return !this.googleId && !this.facebookId;
        }
    },
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    gender: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    profilePicture: { type: String, default: null },
    publicId: { type: String, default: null },
    coverPhoto: { type: String, default: null },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bio: { type: mongoose.Schema.Types.ObjectId, ref: 'Bio' }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User;