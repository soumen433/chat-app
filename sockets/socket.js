const socketIo = require('socket.io');
const { sendMessage } = require('../controller/messageController');

const socketConfig = (server) => {
    console.log('Initializing Socket.IO'); 
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('sendMessage', async (data) => {
            const message = await sendMessage(data);
            if (data.receiverId) {
                io.to(data.receiverId).emit('receiveMessage', message);
            } else if (data.groupId) {
                socket.broadcast.to(data.groupId).emit('receiveMessage', message);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

module.exports = socketConfig;