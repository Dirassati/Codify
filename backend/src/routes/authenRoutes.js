/*const express = require("express");
const authController = require("../controllers/authenController");

const router = express.Router();

router.post("/forgot-password", authController.forgotPassword);
router.post("/change-password", authController.changePassword);

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authenController');
const authMiddleware = require('../middleware/authentmiddleware');
/*const rateLimit = require('express-rate-limit');

// Rate limiting for security
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 attempts per window
  message: 'Too many attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});
*/
// Password Reset Flow
router.post('/forgot-password', authenController.forgotPassword);
router.post('/verify-reset-code', authenController.verifyResetCode);
router.post('/reset-password', authenController.resetPassword);
// Authenticated Routes JWT verification
router.post('/change-password', authMiddleware, authenController.changePassword);

// Route Health Check
router.get('/status', (req, res) => {
  res.status(200).json({ status: 'Auth routes operational' });
});

module.exports = router;