const express = require('express');
const router = express.Router();
const { register, updateAccount, activateAccount, deactivateAccount } = require('../controllers/accountController');
const checkAccountStatus = require('../middleware/checkAccountStatus'); 

// POST /register endpoint
router.post('/register', register);


// PUT /api/accounts/:id/activate
router.put('/accounts/:id/activate', activateAccount);

// PUT /api/accounts/:id/deactivate
router.put('/accounts/:id/deactivate', deactivateAccount);

// PUT /api/accounts/:id
router.put('/accounts/:id', checkAccountStatus, updateAccount);

module.exports = router;