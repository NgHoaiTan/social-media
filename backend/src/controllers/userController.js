const userService = require('../services/userService');

const getProfileById = async (req, res) => {
    const userId = req.params.id;
    try {

        const user = await userService.getUserById(userId);
        return res.status(200).json({
            message: "Profile retrieved successfully",
            user,
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const profileUser = await userService.getUserById(userId);
        return res.status(200).json({
            message: "Profile retrieved successfully",
            user: profileUser,

        }
        )
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const editProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const profilePicture = req.file;

        const { username, email, password, gender, dateOfBirth } = req.body;
        const updatedUser = await userService.updateProfile(userId, {
            username,
            email,
            password,
            profilePicture,
            gender,
            dateOfBirth
        });
        return res.status(201).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        })




    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }


}

module.exports = {
    getProfile,
    editProfile,
    getProfileById
}