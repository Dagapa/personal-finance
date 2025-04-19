import type { TransactionI } from "@models/transaction";
import { Get, Post, Put, Del } from "@services/httpServices";

export const getTransactions = async () => {
  try {
    return await Get<TransactionI[]>('/transactions');
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createTransaction = async (transaction: Omit<TransactionI, 'id'>) => {
  try {
    return await Post<TransactionI>('/transactions', transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id: string, transaction: TransactionI) => {
  try {
    return await Put<TransactionI>(`/transactions/${id}`, transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    return await Del<TransactionI>(`/transactions/${id}`);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const transformTransactionsToVisualice = (transactions: TransactionI[]) => {
  return transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date).toISOString()
  }));
}