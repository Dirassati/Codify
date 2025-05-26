const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

router.post('/generate/all', timetableController.generateAllGroupsDryRun);
router.get('/:groupId', timetableController.getTimetable);
router.get('/student/:studentId', timetableController.getStudentTimetable);
router.get('/teacher/:teacherId', timetableController.getTeacherTimetable);

module.exports = router;