// src/controllers/transaction.controller.ts
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction } from '../services/transaction.service';

/**
 * Crear una nueva transacción
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Prisma.TransactionCreateInput = req.body;
    const transaction = await createTransaction(data);
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todas las transacciones
 */
export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Actualizar una transacción por ID
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data: Prisma.TransactionUpdateInput = req.body;
    const updated = await updateTransaction(id, data);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Eliminar una transacción por ID
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    await deleteTransaction(id);
    res.json({ message: 'Transacción eliminada con éxito' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};