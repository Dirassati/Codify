const socketIO = require('socket.io');

module.exports = (server) => {
  return socketIO(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: ["GET", "POST"]
    }
  });
};