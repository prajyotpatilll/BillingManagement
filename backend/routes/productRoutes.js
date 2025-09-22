import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const productRoutes = express.Router();

// POST /api/admin/login
productRoutes.get('/', authMiddleware, getProducts);
productRoutes.post('/', authMiddleware, createProduct);
productRoutes.put('/:id', authMiddleware, updateProduct);
productRoutes.delete('/:id', authMiddleware, deleteProduct);

export default productRoutes;
