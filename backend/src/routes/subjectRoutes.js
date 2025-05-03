const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const validateFields = require("../middleware/validateFields");

router.post("/subjects", validateFields, subjectController.createSubject);
router.get("/subjects/list", subjectController.getSubjects);

module.exports = router;
