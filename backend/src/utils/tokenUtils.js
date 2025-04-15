const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  // Generate 4-digit code
  generateResetCode: () => crypto.randomInt(1000, 9999).toString(),
  
  // Generate JWT token
  generateJWT: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' }),
  
  // Verify JWT token
  verifyJWT: (token) => jwt.verify(token, process.env.JWT_SECRET)
};