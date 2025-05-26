const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/students", studentController.listStudents);
router.get("/groups/:groupId/students", studentController.listStudentsByGroup);
router.patch('/students/specialization', studentController.assignSpecialization);
router.get('/students/:id/available-specializations', studentController.getAvailableSpecializations);
router.get('/students/:id/details', studentController.getStudentDetails);
router.get('/students/:id/subjects', studentController.listStudentSubjects);

module.exports = router;