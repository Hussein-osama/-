// userRoutes.js or similar file
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to protect the /profile route
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
