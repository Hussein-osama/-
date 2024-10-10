const Cart = require('../models/Cart');
const Payment = require('../models/Payment');

// Controller to handle payment
const PaymentController = {

    // Process payment
    async processPayment(req, res) {
        try {
            // Find the cart for the user (req.userId is assumed to come from auth middleware)
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
                user: req.userId,  // Assuming the userId comes from auth middleware
                items: items,
                totalAmount: totalAmount
            });

            // Save payment
            await payment.save();

            // Clear the cart after payment is processed
            cart.items = [];
            await cart.save();

            // Return the payment details in the response
            res.status(201).json({ message: 'Payment successfully processed', payment });
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(500).json({ error: 'Error processing payment' });
        }
    }
};

module.exports = PaymentController;
