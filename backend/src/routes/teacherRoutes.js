const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/teachers/list", teacherController.listTeachers);
router.post('/teachers/:id/subjects', teacherController.assignSubjects);
router.get('/teachers/:id', teacherController.getTeacherWithSubjects);
router.post('/groups/:group_id/subjects/assign-teacher',  teacherController.assignTeacherToGroupSubject);
router.get('/groups/:group_id/subjects',  teacherController.getGroupSubjectsWithTeachers );
router.get('/teachers/:id/groups', teacherController.getTeacherGroupsWithDetails);
router.get('/groups/teacher-for-subject', teacherController.getTeacherForSubjectInGroup);

module.exports = router;