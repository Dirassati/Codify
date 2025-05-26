const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User");
<<<<<<< HEAD
const transporter = require("../utils/mailer");
=======
const transporter = require("../config/mailer");
>>>>>>> 8e89c22a012d1052857f90ff89f75f129913d5c1

const authService = {
    generateToken: (email) => {
        return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    },

    sendResetEmail: async (email, token) => {

        const resetLink = `http://localhost:5000/reset-password?token=${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });},


    
    changePassword: async (userId, currentPassword, newPassword) => {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        console.log(user.password);
        console.log(currentPassword);
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) throw new Error("Current password is incorrect");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(userId, hashedPassword);
    }
};

module.exports = authService;
