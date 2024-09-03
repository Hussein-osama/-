const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/itemRoutes'));
app.use('/api', require('./routes/categoryRoutes')); // Optional

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
