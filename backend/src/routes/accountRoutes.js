const express = require("express");
const router = express.Router();
const {
  register,
  updateAccount,
  activateAccount,
  deactivateAccount,
  login,
  logout,
} = require("../controllers/accountController");
const checkAccountStatus = require("../middleware/checkAccountStatus");
const { authenticate } = require("../middlewares/authMiddleware");

// POST /register endpoint
router.post("/register", register);

// PUT /api/accounts/:id/activate
router.put("/accounts/:id/activate", activateAccount);

// PUT /api/accounts/:id/deactivate
router.put("/accounts/:id/deactivate", deactivateAccount);

// PUT /api/accounts/:id
router.put("/accounts/:id", checkAccountStatus, updateAccount);

//POST /api/login
router.post("/login", login);

//POST /api/logout
router.post("/logout", logout);

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
