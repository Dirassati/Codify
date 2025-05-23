const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Dry-run for all groups
router.post('/generate/all', timetableController.generateAllGroupsDryRun);

// Keep your existing routes
router.get('/dry-run/:groupId', timetableController.dryRun);
router.post('/generate/:groupId', timetableController.generateAndSave);
router.get('/:groupId', timetableController.getTimetable);
router.get('/student/:studentId', timetableController.getStudentTimetable);
router.get('/teacher/:teacherId', timetableController.getTeacherTimetable);

module.exports = router;