import type { TransactionI } from '../models/transaction';

interface UseTransaction {
	addTransaction: (transaction: TransactionI) => void;
}

export const useTransaction = (): UseTransaction => {
	const addTransaction = (transaction: TransactionI) => {
		console.log(transaction);
	};

	return {
		addTransaction,
	};
};
