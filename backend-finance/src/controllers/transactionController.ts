import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '../types/transaction';

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data as Transaction[]);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const createTransaction = async (req: Request<{}, {}, CreateTransactionDTO>, res: Response) => {
  try {
    const { amount, description, category, type } = req.body;
    
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        { amount, description, category, type }
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0] as Transaction);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const updateTransaction = async (
  req: Request<{ id: string }, {}, UpdateTransactionDTO>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data[0] as Transaction);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const deleteTransaction = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};