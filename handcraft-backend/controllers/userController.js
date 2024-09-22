// userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        // Retrieve user information based on the userId set by the middleware
        const user = await User.findById(req.userId).select('name email _id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with user details
        res.status(200).json(user);
    } catch (err) {
        // Handle any errors during user retrieval
        res.status(500).json({ error: 'Server error' });
    }
};
