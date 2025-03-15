const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddlware");

//POST /api/login
router.post("/login", login);

//POST /api/logout
router.post("/logout", logout);

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;