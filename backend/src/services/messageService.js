const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { default: mongoose } = require("mongoose");

const createMessage = async (senderId, receiverId, message) => {
    try {
        if (!mongoose.isValidObjectId(receiverId)) {
            throw new Error("Invalid ID format");
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        // establish the conversation if not started yet.
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()])
        return newMessage;
    } catch (error) {
        throw new Error(error.message)
    }

}
const getAllMessage = async (senderId, receiverId) => {
    if (senderId === receiverId) {
        return [];
    }
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    }).populate('messages');
    if (!conversation)
        return [];

    return conversation?.messages;

}
module.exports = {
    createMessage,
    getAllMessage
}