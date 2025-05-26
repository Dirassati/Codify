const { saveMessage , markAsRead } = require('../models/Message');

const setupSocket = (io) => {
  io.use(require('../middleware/socketAuth'));

  io.on('connection', (socket) => {
    socket.on('joinChat', (chatId) => {
      socket.join(`chat_${chatId}`);
    });

    // Mark messages as read when joining
     markAsRead(chatId, socket.user.id);

    socket.on('sendMessage', async (data) => {
      try {
        const message = await saveMessage(
          data.chatId,
          socket.user.id,
          data.content
        );
        io.to(`chat_${data.chatId}`).emit('newMessage', message);
      } catch (err) {
        socket.emit('error', err.message);
      }
    });
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.id} disconnected`);
    });
  });
};

module.exports = setupSocket;