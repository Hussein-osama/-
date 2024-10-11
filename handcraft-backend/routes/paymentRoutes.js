const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Assuming Cart model exists
const Payment = require('../models/Payment');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/payments
router.post('/payments', authMiddleware, async (req, res) => {
    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ user: req.userId }).populate('items.item');
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        // Calculate total price
        let totalAmount = 0;
        const items = cart.items.map(cartItem => {
            const price = cartItem.item.price * cartItem.quantity;
            totalAmount += price;
            return {
                item: cartItem.item._id,
                quantity: cartItem.quantity,
                price: cartItem.item.price
            };
        });

        // Create a new payment record
        const payment = new Payment({
            user: req.userId, // Taken from the authMiddleware
            items,
            totalAmount
        });

        // Save payment
        await payment.save();

        // Clear user's cart after payment
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Payment successfully processed', payment });
    } catch (error) {
        res.status(500).json({ error: 'Error processing payment' });
    }
});

module.exports = router;
