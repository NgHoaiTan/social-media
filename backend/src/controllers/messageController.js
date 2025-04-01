
const messageService = require('../services/messageService')
const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const { message } = req.body;
        const newMessage = await messageService.createMessage(senderId, receiverId, message);

        return res.status(200).json({
            newMessage
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

}

module.exports = {
    sendMessage,
}