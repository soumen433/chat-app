const express = require('express');
const router = express.Router();

const { createGroup, sendGroupMessage } = require('../controller/groupmassage');
const { protect } = require('../middlewares/auth');
const { sendMessage, getMessageHistory } = require('../controller/messageController');
const { register, login } = require('../controller/userController');

router.post('/api/groups', protect, createGroup);
router.post('/api/groups/:groupId/messages', protect, sendGroupMessage);

router.post('/api/messages', protect, sendMessage);
router.get('/api/messages/history', protect, getMessageHistory);

router.post('/api/register', register);
router.post('/api/login', login);

module.exports = router;
