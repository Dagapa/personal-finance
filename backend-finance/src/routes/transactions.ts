import express, { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
} from '../controllers/transactionController';


const router: Router = express.Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;