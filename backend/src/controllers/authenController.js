/*const authService = require("../services/authService");
const User = require("../models/User");

const authController = {
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findByEmail(email);
            if (!user) return res.status(404).json({ message: "User not found" });

            const token = authService.generateToken(email);
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);
            await User.updateResetToken(email, token, expiresAt);

            await authService.sendResetEmail(email, token);
            res.json({ message: "Password reset email sent!" });
        } catch (error) {
            console.error("Forgot Password Error:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { userId, currentPassword, newPassword } = req.body;

            if (!userId || !currentPassword || !newPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }

            await authService.changePassword(userId, currentPassword, newPassword);
            res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            console.error("Change Password Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = authController;
*/
//new code version
const bcrypt = require('bcrypt');
const { generateResetCode, generateJWT } = require('../utils/tokenUtils');
const emailService = require('../config/mailer');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findByEmail(email);
      
      if (!user) return res.status(200).json({ message: 'If email exists, a code was sent' });
      
      const code = generateResetCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      await userModel.setResetToken(user.id, code, expiresAt);
      await emailService.sendResetCode(email, code);
      
      res.status(200).json({ message: 'If email exists, a code was sent' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  verifyResetCode: async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await userModel.findByEmail(email);
      
      if (!user || user.reset_token !== code || new Date(user.reset_token_expires) < new Date()) {
        return res.status(400).json({ message: 'Invalid code' });
      }
      
      const token = generateJWT({ userId: user.id, purpose: 'password_reset' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Verify code error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!userId) return res.status(401).json({ message: 'Invalid token' });
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModel.updatePassword(userId, hashedPassword);
      
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await userModel.findById(req.user.id);
      
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) return res.status(401).json({ message: 'Current password is incorrect' });
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModel.updatePassword(user.id, hashedPassword);
      
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};