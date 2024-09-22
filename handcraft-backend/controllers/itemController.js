const Item = require('../models/Item');

exports.createItem = async (req, res) => {
    const { name, description, price, category, images } = req.body;
    const owner = req.userId;
    try {
        const newItem = new Item({ name, description, price, category, owner, images });
        await newItem.save();
        res.status(201).json({ message: 'Item created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find().populate('owner', 'name');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id).populate('owner', 'name');
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, images } = req.body;
    try {
        const item = await Item.findById(id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.owner.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });

        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.category = category || item.category;
        item.images = images || item.images;

        await item.save();
        res.json({ message: 'Item updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.owner.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });

        await item.remove();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
