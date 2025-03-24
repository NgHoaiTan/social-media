const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const { checkExistingUser } = require('./userService');
const googleLogin = async (userData) => {
    let user = await checkExistingUser(userData.email);
    if (!user) {
        // Nếu người dùng chưa tồn tại, tạo mới
        user = await User.create({
            username: userData.username,
            googleId: userData.googleId,
            email: userData.email,
            profilePicture: userData.profilePicture
        });
    }
    return {
        user,
        token: generateToken(user),
    };
}

module.exports = { googleLogin };