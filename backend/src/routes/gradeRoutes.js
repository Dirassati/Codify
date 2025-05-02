const express = require("express");
const gradeController = require("../controllers/gradeController");
const router = express.Router();

router.post("/grades", gradeController.createGrade);
router.get("/grades/list", gradeController.getAllGrades);
router.post("/grades/assign-subjects", gradeController.assignSubjectsToGrade);
router.get("/grades/subjects", gradeController.getGradeSubjects);

module.exports = router;