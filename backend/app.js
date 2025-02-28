const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const pool = require('./src/db/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});

app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});

// Add the POST /register endpoint
app.post('/register', async (req, res) => {
    const { email, matricule, password } = req.body;

    // Validate input
    if (!email && !matricule) {
        return res.status(400).json({ message: 'Email or matricule is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Insert the user into the database
        const query = `
            INSERT INTO Users (email, matricule, password) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const values = [email || null, matricule || null, hashedPassword];

        const result = await pool.query(query, values);

        // Return success response
        res.status(201).json({
            message: 'Account created successfully',
            user: result.rows[0], // Return the created user (without password)
        });
    } catch (err) {
        console.error(err);

        // Handle unique constraint violations 
        if (err.code === '23505') {
            return res.status(400).json({ message: 'Email or matricule already exists' });
        }

        // Handle other errors
        res.status(500).json({ message: 'Error creating account' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});