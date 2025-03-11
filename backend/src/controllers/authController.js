const { authenticateUser } = require("../services/authService");

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { token, user } = await authenticateUser(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// User Logout (Handled on the client-side)
const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, logout };
