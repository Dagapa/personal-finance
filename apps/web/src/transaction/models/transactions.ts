export interface FormValues {
  [key: string]: string | boolean | string[];
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  transactionDate: string;
}