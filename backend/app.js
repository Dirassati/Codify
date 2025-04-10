const express = require('express');
const dotenv = require('dotenv');
const accountRoutes = require('./src/routes/accountRoutes');
const authenRoutes = require('./src/routes/authenRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api', accountRoutes);

app.use("/auth", authenRoutes);
// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});