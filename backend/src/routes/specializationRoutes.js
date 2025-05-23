const express = require("express");
const { createSpecialization } = require("../controllers/specializationController");
const validateSpecialization = require("../middleware/validateSpecialization");

const router = express.Router();

router.post("/specializations", validateSpecialization, createSpecialization);

module.exports = router;
