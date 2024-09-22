const Stripe = require('stripe');
const Cart = require('../models/Cart');
// In your payment controller file, e.g., paymentController.js
const stripe = require('stripe')('your_stripe_secret_key_here');

exports.createPaymentIntent = async (req, res) => {
    const { amount } = req.body; // Amount to charge (in cents)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: 'usd', // Change this to your desired currency
            // Add additional options if needed
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Payment intent creation failed' });
    }
};
