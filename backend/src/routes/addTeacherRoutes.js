const express = require('express');
const router = express.Router();
const {createTeacher} = require('../controllers/addingTeacherController');
const  adminAuth  = require('../middleware/authAdminmiddleware');
const authentmiddleware = require('../middleware/authentmiddleware');
const { validateTeacher } = require('../middleware/validateTeacherMiddleware');

// POST /api/teachers

router.post('/',authentmiddleware,adminAuth,validateTeacher,createTeacher);
/* unecessary at the moment
// GET /api/teachers/:id
router.get('/:id',
  adminAuth,
  teacherController.getTeacher
);
*/
module.exports = router;
