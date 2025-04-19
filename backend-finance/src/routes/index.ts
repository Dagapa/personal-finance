import express from 'express';
import transactionRoutes from './transaction.routes';

const router = express.Router();

// Definí los endpoints agrupados acá
router.use('/transactions', transactionRoutes);

// Ejemplo futuro:
// const userRoutes = require('./user.routes');
// router.use('/users', userRoutes);

export default router;