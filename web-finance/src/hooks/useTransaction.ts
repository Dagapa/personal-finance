import { useState } from 'react';
import type { TransactionI } from '@models/transaction';

const STORAGE_KEY = 'transactions';

const useTransactions = () => {
	const [transactions, setTransactions] = useState<TransactionI[]>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	const addTransaction = (transaction: Omit<TransactionI, 'id'>) => {
		const newTransaction = {
			...transaction,
			id: Date.now(),
			date: new Date(transaction.date).toISOString()
		};

		const updatedTransactions = [...transactions, newTransaction];
		setTransactions(updatedTransactions);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
	};

	const updateTransaction = (id: number, updatedData: Partial<TransactionI>) => {
		const updatedTransactions = transactions.map(transaction =>
			transaction.id === id ? { ...transaction, ...updatedData } : transaction
		);
		setTransactions(updatedTransactions);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
	};

	const deleteTransaction = (id: number) => {
		const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
		setTransactions(updatedTransactions);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
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