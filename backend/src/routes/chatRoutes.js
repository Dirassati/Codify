const express = require('express');
const router = express.Router();
const { createChat } = require('../controllers/chatController');
const auth = require('../middleware/authentmiddleware');

router.post('/', auth, createChat);
module.exports = router;