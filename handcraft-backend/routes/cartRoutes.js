const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Add item to cart
router.post('/cart', authMiddleware, addToCart);

// Get user cart
router.get('/cart', authMiddleware, getCart);

// Remove item from cart
router.delete('/cart/:itemId', authMiddleware, removeFromCart);

module.exports = router;
