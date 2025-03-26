const User = require("../models/User")
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const uploadToCloudinary = require('../utils/cloudinaryUtil')

const checkExistingUser = async (email) => {
    const existingUser = await User.findOne({ email: email });
    return existingUser;
}

const getUserById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid user ID format");
    }

    const user = await User.findById(id).select('username gender dateOfBirth profilePicture posts');
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

const createUser = async ({ username, email, password, gender, dateOfBirth }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        dateOfBirth
    })

    return await newUser.save();
}

const updateProfile = async (userId, updatedUser) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const updateKeys = Object.keys(updatedUser);

    if (updatedUser.profilePicture) {

        const uploadResult = await uploadToCloudinary(updatedUser.profilePicture, null, {
            folder: "user_avatars"
        })
        updatedUser.profilePicture = uploadResult.secure_url;

    }

    if (updateKeys.includes('password')) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    }


    updateKeys.forEach((key) => {
        user[key] = updatedUser[key]
    })
    await user.save();
    return user;

}
module.exports = {
    checkExistingUser,
    createUser,
    getUserById,
    updateProfile
}