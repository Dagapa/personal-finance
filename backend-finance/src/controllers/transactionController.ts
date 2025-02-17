// src/controllers/transactionController.ts
import { Response } from 'express';
import { supabase } from '../config/supabase';
import { 
  CreateTransactionDTO, 
  UpdateTransactionDTO,
  CreateTransactionSchema,
  UpdateTransactionSchema 
} from '../types/transaction';
import { AuthenticatedRequest } from '../middleware/auth';

import z from 'zod';

export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('transaction_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getTransactionById = async (
  req: AuthenticatedRequest, 
  res: Response
) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Transacción no encontrada' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const createTransaction = async (
  req: AuthenticatedRequest & { body: CreateTransactionDTO }, 
  res: Response
) => {
  try {
    const validatedData = CreateTransactionSchema.parse({
      ...req.body,
      user_id: req.user!.id
    });
    
    const { data, error } = await supabase
      .from('transactions')
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};

export const updateTransaction = async (
  req: AuthenticatedRequest & { body: UpdateTransactionDTO },
  res: Response
) => {
  try {
    const { id } = req.params;
    
    // Verificar que la transacción exista y pertenezca al usuario
    const { data: existingTransaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Transacción no encontrada' });
      }
      throw fetchError;
    }

    const validatedData = UpdateTransactionSchema.parse(req.body);

    const { data, error } = await supabase
      .from('transactions')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};

export const deleteTransaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar que la transacción exista y pertenezca al usuario
    const { data: existingTransaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Transacción no encontrada' });
      }
      throw fetchError;
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user!.id);

    if (error) throw error;

    res.json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Funciones adicionales útiles

export const getTransactionsByDateRange = async (
  req: AuthenticatedRequest, 
  res: Response
) => {
  try {
    const { start_date, end_date } = req.query;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id)
      .gte('transaction_date', start_date)
      .lte('transaction_date', end_date)
      .order('transaction_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getTransactionsByCategory = async (
  req: AuthenticatedRequest, 
  res: Response
) => {
  try {
    const { category } = req.params;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id)
      .eq('category', category)
      .order('transaction_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getTransactionSummary = async (
  req: AuthenticatedRequest, 
  res: Response
) => {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id);

    if (error) throw error;

    const summary = {
      total_income: transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0),
      total_expenses: transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0),
      by_category: transactions.reduce((acc, t) => ({
        ...acc,
        [t.category]: (acc[t.category] || 0) + Number(t.amount)
      }), {} as Record<string, number>)
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};