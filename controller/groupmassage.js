const Group = require('../model/groupModel');
const Message = require('../model/messageModel');

exports.createGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const group = await Group.create({ name:name, members :members});
        res.status(201).json({message:"Group created successfully",data:group});
    } catch (error) {
        res.status(400).json({ error: 'Failed to create group' });
    }
};

exports.sendGroupMessage = async (req, res) => {
    const { senderId, content } = req.body;
    const { groupId } = req.params;
    try {
        const message = await Message.create({ senderId:senderId, groupId:groupId, content:content });
        res.status(201).json({message:"message send successfully",data:message});
    } catch (error) {
        res.status(400).json({ error: 'Failed to send group message' });
    }
};
