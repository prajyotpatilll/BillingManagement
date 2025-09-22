import express from 'express';

import { createOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.get('/', authMiddleware, getOrders);
orderRoutes.get('/:id', authMiddleware, getOrderById);
orderRoutes.post('/', authMiddleware, createOrder);
orderRoutes.put('/:id', authMiddleware, updateOrderStatus);
orderRoutes.delete('/:id', authMiddleware, deleteOrder);


export default orderRoutes;
