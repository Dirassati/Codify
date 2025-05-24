const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const accountRoutes = require("./src/routes/accountRoutes");
const authRoutes = require("./src/routes/authRoutes");
const inscriptionRoutes = require("./src/routes/inscriptionRoutes");
const classroomRoutes = require("./src/routes/classroomRoutes");
const equipmentRoutes = require("./src/routes/equipmentRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const groupRoutes = require("./src/routes/groupRoutes"); 
const gradeRoutes = require("./src/routes/gradeRoutes");
const specializationRoutes = require("./src/routes/specializationRoutes"); 
const studentRoutes = require('./src/routes/studentRoutes');
const parentRoutes = require('./src/routes/parentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const timetableRoutes = require('./src/routes/timetableRoutes');
const reinscriptionRoutes = require("./src/routes/re-inscriptionRoutes");
const inactivateOldReinscriptions = require("./src/utils/inactivateOldReinscriptions");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const { testConnection } = require("./testDbConnection");


const authenRoutes = require('./src/routes/authenRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const http = require('http');
const socketConfig = require('./src/config/socket');
const setupSocket = require('./src/services/SocketService'); 
/*const searchRoutes = require('./routes/searchRoutes');*/
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());

// Routes
app.use("/api", accountRoutes);
app.use("/api", authRoutes);
app.use("/api/inscription", inscriptionRoutes);
app.use("/api", classroomRoutes);
app.use("/api", equipmentRoutes);
app.use("/api", subjectRoutes);
app.use("/api", groupRoutes); 
app.use("/api", gradeRoutes);
app.use("/api", specializationRoutes);
app.use('/api', studentRoutes);
app.use('/api', parentRoutes);
app.use('/api', teacherRoutes);
app.use("/api/reinscription", reinscriptionRoutes);
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
//add teacher 
app.use('/api/admin/addteacher',require('./src/routes/addTeacherRoutes'))
app.use('/api/timetable', timetableRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

// Error handling middleware (should be after routes)
app.use(errorMiddleware);

// Cron job
cron.schedule("0 0 * * *", () => {
  // Runs daily at midnight
  inactivateOldReinscriptions();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testConnection();
});
