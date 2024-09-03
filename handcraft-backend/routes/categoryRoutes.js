const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/categories', getCategories);
router.post('/categories', authMiddleware, createCategory);

module.exports = router;
