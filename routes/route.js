const express = require('express');
const router = express.Router();

const { createGroup, sendGroupMessage } = require('../controller/groupmassage');
const { protect } = require('../middlewares/auth');
const { sendMessage, getMessageHistory } = require('../controller/messageController');
const { register, login } = require('../controller/userController');

router.post('/groups', protect, createGroup);
router.post('/groups/:groupId/messages', protect, sendGroupMessage);

router.post('/messages', protect, sendMessage);
router.get('/messages/history', protect, getMessageHistory);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
