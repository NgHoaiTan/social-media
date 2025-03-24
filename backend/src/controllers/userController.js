const userService = require('../services/userService');
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

module.exports = {
    getProfile
}