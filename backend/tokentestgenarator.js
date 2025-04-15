const jwt = require('jsonwebtoken');
require('dotenv').config();

// Replace these values:
const mockUserId = "1"; // Use a real user ID from your DB (or fake if backend allows)
const jwtSecret = process.env.JWT_SECRET; // Must match your server's `JWT_SECRET`

// Generate the token
const token = jwt.sign(
  { id: mockUserId },  // Payload (usually contains user ID)
  jwtSecret,
  { expiresIn: '1h' }  // Token expires in 1 hour
);

console.log("Mock JWT Token:", token);

// part for admin token testing and debugging
console.log('TEST ADMIN TOKEN:', token);
console.log(`Test with:
curl -H "Authorization: Bearer ${token}" http://localhost:5000/api/admin/students/search`);