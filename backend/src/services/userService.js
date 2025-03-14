const User = require("../models/user")
const bcrypt = require('bcrypt')

const checkExistingUser = async (email) => {
    const existingUser = await User.findOne({ email: email });
    return existingUser;

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

module.exports = {
    checkExistingUser,
    createUser,
}