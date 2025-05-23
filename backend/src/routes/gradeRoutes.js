const express = require("express");
const gradeController = require("../controllers/gradeController");
const validateGrade = require("../middleware/validateGrade");
const validateGradeSubjectAssignment = require("../middleware/validateGradeSubjectAssignment");
const router = express.Router();

// Grade CRUD
router.post("/grades", validateGrade, gradeController.createGrade);
router.get("/grades", gradeController.getAllGrades);

// Subject assignment
router.post(
  "/grades/assign-subjects",
  validateGradeSubjectAssignment,
  gradeController.assignSubjectsToGrade
);
router.get("/grades/:gradeId/subjects", gradeController.getGradeSubjects);

module.exports = router;