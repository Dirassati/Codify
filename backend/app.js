const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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
const errorMiddleware = require("./src/middleware/errorMiddleware");
const { testConnection } = require("./testDbConnection");
const reinscriptionRoutes = require("./src/routes/re-inscriptionRoutes");
const cron = require("node-cron");
const inactivateOldReinscriptions = require("./src/utils/inactivateOldReinscriptions");

dotenv.config();

const app = express();
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
