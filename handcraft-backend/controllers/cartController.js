const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.userId });

        // Create a new cart if it doesn't exist
        if (!cart) {
            cart = new Cart({ user: req.userId, items: [] });
        }

        // Check if item is already in cart
        const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);
        if (itemIndex > -1) {
            // Update quantity if item is already in cart
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.items.push({ item: itemId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate('items.item');

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    console.log('DELETE request to /api/cart with itemId:', req.params.itemId);
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Log the cart data for debugging
        console.log('Cart data:', JSON.stringify(cart, null, 2));

        // Find the item in the cart and remove it
        const itemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);
        if (itemIndex === -1) {
            console.log('Item ID not found in cart:', itemId);
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1); // Remove the item from the cart array
        await cart.save(); // Save the updated cart to the database

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
