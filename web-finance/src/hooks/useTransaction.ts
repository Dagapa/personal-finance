import { useEffect, useState } from 'react';
import type { OnAddTransaction, TransactionI } from '@models/transaction';
import { createTransaction, deleteTransaction, getTransactions } from '@services/transactionsServices';

const STORAGE_KEY = 'transactions';

const useTransactions = () => {
	const [transactions, setTransactions] = useState<TransactionI[]>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		getTransactions().then((res) => onSetTransactions(res));
	}, [])

	const addTransaction: OnAddTransaction = (transaction) => {
		const newTransaction = {
			...transaction,
			date: new Date(transaction.date).toISOString()
		};
		createTransaction(newTransaction).then((res: TransactionI) => {
			onSetTransactions([...transactions, res]);
		}).catch(error => {
			console.error('Error creating transaction:', error);
		});
	};

	const updateTransaction = (id: number, updatedData: Partial<TransactionI>) => {
		const updatedTransactions = transactions.map(transaction =>
			transaction.id === id ? { ...transaction, ...updatedData } : transaction
		);
		onSetTransactions(updatedTransactions);
	};

	const onDeleteTransaction = (id: number) => {
		deleteTransaction(id.toString()).then(() => {
			onSetTransactions(transactions.filter(transaction => transaction.id !== id));
		}).catch(error => {
			console.error('Error deleting transaction:', error);
		});
	};

	const onSetTransactions = (newTransactions: TransactionI[]) => {
		setTransactions(newTransactions);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
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
		onDeleteTransaction
	};
};

export default useTransactions;