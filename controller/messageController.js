const Message = require('../model/messageModel');

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, groupId, content } = req.body;
    try {
        const message = await Message.create({ senderId:senderId, receiverId:receiverId, groupId:groupId, content:content });
        res.status(201).json({message:"message send successfully",data:message});
    } catch (error) {
        res.status(400).json({ error: 'Failed to send message' });
    }
};

exports.getMessageHistory = async (req, res) => {
    const { userId, withUserId, groupId, page = 1, pageSize = 10 } = req.query;
    try {
        let query = {};

        if (groupId) {
            query = { groupId };
        } else if (userId && withUserId) {
            query = {
                $or: [
                    { senderId: userId, receiverId: withUserId },
                    { senderId: withUserId, receiverId: userId }
                ]
            };
        } else {
            return res.status(400).json({ error: 'Invalid query parameters' });
        }
        const messages = await Message.find(query).sort({ createdAt: -1 }) .skip((page - 1) * pageSize).limit(pageSize);
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve message history' });
    }
};
