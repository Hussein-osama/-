const express = require('express');
const router = express.Router();
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/items', authMiddleware, createItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.put('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItem);

module.exports = router;
