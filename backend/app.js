const express = require('express');
const dotenv = require('dotenv');
const accountRoutes = require('./src/routes/accountRoutes');
const authenRoutes = require('./src/routes/authenRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const http = require('http');
const socketConfig = require('./src/config/socket');
const setupSocket = require('./src/services/SocketService'); 
/*const searchRoutes = require('./routes/searchRoutes');*/
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api', accountRoutes);
//for password reset/change
app.use("/api/auth", authenRoutes);
//for admin search functionality
/*app.use('/api/search', searchRoutes);*/
app.use('/api/admin/students/search', require('./src/routes/StudentsearchRoutes'));
app.use('/api/admin/teachers/search', require('./src/routes/TeachersearchRoutes'));
app.use('/api/admin/parents/search', require('./src/routes/ParentsearchRoutes'));

//socket.io
const io = socketConfig(server);
setupSocket(io); 

//chats
app.use('/api/chats', chatRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});