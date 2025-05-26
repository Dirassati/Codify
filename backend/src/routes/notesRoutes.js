const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/summary/:eleveId/:trimestre', notesController.getStudentGradesSummary);
router.get('/all-with-averages', notesController.getAllStudentsWithAverages);
router.get('/:groupId/:subjectId/:trimestre', notesController.getStudentsGrades);
router.post('/save', notesController.saveGrade);

module.exports = router;