const express = require('express');
const router = express.Router();
const controller = require('../controllers/StudentsearchController');
const authentmiddleware = require('../middleware/authentmiddleware');
const { validateAndParseDates } = require('../middleware/datesearchmiddleware');
const authAdmin = require('../middleware/authAdminmiddleware');

router.use(authentmiddleware);
router.use(authAdmin);
router.get('/',validateAndParseDates,controller.search);
// router.get('/by-grade/:grade', controller.searchByGrade);

module.exports = router;