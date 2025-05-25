const socketIO = require('socket.io');
const cors = require('cors');

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIO(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Connection event
    io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);

      // Join user to their own room
      socket.on('join-user-room', (userId) => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined their room`);
      });

      // Disconnect event
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};