const express = require('express');
const router = express.Router();
const controller = require('../controllers/ParentsearchController');
const authentmiddleware = require('../middleware/authentmiddleware');
const { validateAndParseDates } = require('../middleware/datesearchmiddleware');
;const authAdmin = require('../middleware/authAdminmiddleware');
router.use(authentmiddleware);
router.use(authAdmin);
router.get('/',validateAndParseDates,controller.search);

module.exports = router;