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
const studentRoutes = require("./src/routes/studentRoutes");
const parentRoutes = require("./src/routes/parentRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");
const timetableRoutes = require("./src/routes/timetableRoutes");
const reinscriptionRoutes = require("./src/routes/re-inscriptionRoutes");
const notesRoutes = require('./src/routes/notesRoutes');
const inactivateOldReinscriptions = require("./src/utils/inactivateOldReinscriptions");

const errorMiddleware = require("./src/middleware/errorMiddleware");
const { testConnection } = require("./testDbConnection");
const http = require("http");
const socket = require("./src/utils/socket");
const absenceRoutes = require("./src/routes/absenceRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes
const notesService = require('./src/services/notesService');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
socket.init(server);

// Make io accessible in routes if needed
app.set("io", socket.getIO());

module.exports = server;

 


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
app.use("/api", studentRoutes);
app.use("/api", parentRoutes);
app.use("/api", teacherRoutes);
app.use("/api/reinscription", reinscriptionRoutes);

app.use("/api/timetable", timetableRoutes);
app.use("/api/absences", absenceRoutes);
app.use("/api/notifications", notificationRoutes);

app.use('/api/timetable', timetableRoutes);
app.use('/api/notes', notesRoutes);
notesService.initializeNotesForNewStudents();


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
