const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const validateSubject = require("../middleware/validateSubject");

router.post("/subjects", validateSubject, subjectController.createSubject);
router.get("/subjects/list", subjectController.getSubjects);

module.exports = router;