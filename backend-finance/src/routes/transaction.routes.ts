import express from 'express';
import { create, getAll, remove, update } from '../controllers/transaction.controller';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
