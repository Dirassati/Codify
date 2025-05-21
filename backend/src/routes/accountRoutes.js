const express = require('express');
const router = express.Router();
const { register, updateAccount, activateAccount, deactivateAccount } = require('../controllers/accountController');
const checkAccountStatus = require('../middleware/checkAccountStatus');

router.post('/register', register);
router.put('/accounts/:id/activate', activateAccount);
router.put('/accounts/:id/deactivate', deactivateAccount);
router.put('/accounts/:id', checkAccountStatus, updateAccount);

module.exports = router;
