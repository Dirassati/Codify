const authService = require("../services/authService");
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
