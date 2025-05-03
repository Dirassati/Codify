const { saveMessage } = require('../models/Message');

const setupSocket = (io) => {
  io.use(require('../middleware/socketAuth'));

  io.on('connection', (socket) => {
    socket.on('joinChat', (chatId) => {
      socket.join(`chat_${chatId}`);
    });

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
  });
};

module.exports = setupSocket;