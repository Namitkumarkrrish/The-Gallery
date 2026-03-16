const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// This handles the login request
router.post('/login', authController.login);

module.exports = router;