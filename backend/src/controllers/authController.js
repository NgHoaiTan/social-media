const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const registerUser = async (req, res) => {
    try {
        const { username, email, password, gender, dateOfBirth } = req.body;
        const existingUser = await userService.checkExistingUser(email);
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
                success: false
            })
        }
        const newUser = (await userService.createUser({ username, email, password, gender, dateOfBirth }));
        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.checkExistingUser(email);
        if (!user) {
            return res.status(400).json({
                message: "Email or password incorrect!",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Email or password incorrect!",
                success: false
            })
        }
        const token = generateToken(user);
        return res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        })
    }


}

module.exports = {
    registerUser,
    loginUser
}