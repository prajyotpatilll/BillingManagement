import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const adminRoutes = express.Router();

// POST /api/admin/login
adminRoutes.post('/login', loginAdmin);

export default adminRoutes;
