export interface TransactionI {
	id: number;
	amount: number;
	category: string;
	date: string;
	description: string;
}

export type OnAddTransaction = (transaction: Omit<TransactionI, 'id'>) => void;
