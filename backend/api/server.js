import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

import adminRoutes from '../routes/adminRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';
import connectCloudinary from '../config/cloudinery.js';



// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();
connectCloudinary()

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Mount routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Cafe billing backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


