export type TransactionType = 'income' | 'expense';

export interface TransactionI {
	id: number;
	title: string;
	amount: number;
	type: TransactionType;
	category: string;
	date: string;
}

export type OnAddTransaction = (transaction: Omit<TransactionI, 'id'>) => void;
