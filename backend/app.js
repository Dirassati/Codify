const express = require("express");
const dotenv = require("dotenv");
const accountRoutes = require("./src/routes/accountRoutes");
const authRoutes = require("./src/routes/authRoutes");
const inscriptionRoutes = require("./src/routes/inscriptionRoutes");
const reinscriptionRoutes = require("./src/routes/re-inscriptionRoutes");
const { testConnection } = require("./testDbConnection"); 
const cron = require("node-cron");
const inactivateOldReinscriptions = require("./src/utils/inactivateOldReinscriptions");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // or an array of allowed origins
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", accountRoutes);
app.use("/api", authRoutes);
app.use("/api/inscription", inscriptionRoutes);
app.use("/api/reinscription", reinscriptionRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

cron.schedule("0 0 * * *", () => {
  // Runs daily at midnight
  inactivateOldReinscriptions();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testConnection(); // This runs the DB test when the server starts
});
