const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: 'Category created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
