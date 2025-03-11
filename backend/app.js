const express = require("express");
const dotenv = require("dotenv");
const accountRoutes = require("./src/routes/accountRoutes");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api", accountRoutes);
app.use("/api", authRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
