const Item = require('../models/item');

// Create a new item
exports.createItem = async (req, res) => {
    const { name, description, price, category, images } = req.body; // Extract price from request body

    try {
        // Create a new item with the price included
        const newItem = new Item({
            name,
            description,
            price, // Set the price
            category,
            owner: req.userId, // Assuming you have user authentication
            images
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
};

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('owner', 'name email'); // Optionally populate owner info
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id).populate('owner', 'name email');
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, images } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            images
        }, { new: true }); // Return the updated document

        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};
