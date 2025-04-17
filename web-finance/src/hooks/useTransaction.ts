import { useState } from 'react';
import type { OnAddTransaction, TransactionI } from '@models/transaction';
import { transformTransactionsToVisualice } from '@services/transactionsServices';

const STORAGE_KEY = 'transactions';

const useTransactions = () => {
	const [transactions, setTransactions] = useState<TransactionI[]>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	const addTransaction: OnAddTransaction = (transaction) => {
		const newTransaction = {
			...transaction,
			id: Date.now(),
			date: new Date(transaction.date).toISOString()
		};
		onSetTransactions([newTransaction]);
	};

	const updateTransaction = (id: number, updatedData: Partial<TransactionI>) => {
		const updatedTransactions = transactions.map(transaction =>
			transaction.id === id ? { ...transaction, ...updatedData } : transaction
		);
		onSetTransactions(updatedTransactions);
	};

	const deleteTransaction = (id: number) => {
		const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
		onSetTransactions(updatedTransactions);
	};

	const onSetTransactions = (newTransactions: TransactionI[]) => {
		const transformedTransactions = transformTransactionsToVisualice(newTransactions);
		setTransactions(transformedTransactions);
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...transactions, transformedTransactions]));
	};

	// Función para sincronizar con la API
	// const syncWithApi = async () => {
	// 	try {
	// 	 	Implementar la lógica de sincronización con la API
	// 		Por ejemplo:
	// 		await fetch('/api/transactions', {
	// 		  method: 'POST',
	// 		  body: JSON.stringify(transactions)
	// 		});
	// 	} catch (error) {
	// 		console.error('Error al sincronizar con la API:', error);
	// 	}
	// };

	// Sincronizar al guardar cambios
	// useEffect(() => {
	// 	syncWithApi();
	// }, [transactions]);

	return {
		transactions,
		addTransaction,
		updateTransaction,
		deleteTransaction
	};
};

export default useTransactions;