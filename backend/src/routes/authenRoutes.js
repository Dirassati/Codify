const express = require("express");
const authController = require("../controllers/authenController");

const router = express.Router();

router.post("/forgot-password", authController.forgotPassword);
router.post("/change-password", authController.changePassword);

module.exports = router;
