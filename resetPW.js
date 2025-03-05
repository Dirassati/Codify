const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        // Check if user exists
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

        // Generate Token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store Token in Database
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry
        await pool.query("UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3", [token, expiresAt, email]);

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        res.json({ message: "Password reset email sent!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
 
 // Change Password Route
router.post("/change-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get user from the database
    const userQuery = "SELECT id, password FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    const updateQuery = "UPDATE users SET password = $1 WHERE id = $2";
    await pool.query(updateQuery, [hashedPassword, user.id]);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;