export interface TransactionI {
	id: number;
	title: string;
	amount: number;
	type: 'income' | 'expense';
	category: string;
	date: string;
}

export type OnAddTransaction = (transaction: Omit<TransactionI, 'id'>) => void;
