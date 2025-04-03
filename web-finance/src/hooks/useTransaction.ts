import type { TransactionI } from '../models/transaction';

interface UseTransaction {
	addTransaction: (transaction: TransactionI) => void;
}

const useTransaction = (): UseTransaction => {
	const addTransaction = (transaction: TransactionI) => {
		console.log(transaction);
	};

	return {
		addTransaction,
	};
};

export default useTransaction;
