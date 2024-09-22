const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/itemRoutes'));
app.use('/api', require('./routes/categoryRoutes')); // Optional
app.use('/api', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes);
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
