const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.user_role , matricule: user.matricule,  status: user.status },
    SECRET_KEY,
    { expiresIn: "2d" } // Token expires in 2 days
  );
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
const crypto = require('crypto');

module.exports = {
  // Generate 4-digit code
  generateResetCode: () => crypto.randomInt(1000, 9999).toString(),
  
  // Generate JWT token
  generateJWT: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' }),
  
  // Verify JWT token
  verifyJWT: (token) => jwt.verify(token, process.env.JWT_SECRET)
};