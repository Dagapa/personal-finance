import useTransaction from '@hooks/useTransaction.ts';
import type { TransactionI } from '@models/transaction';

export const Transaction = () => {
	const { addTransaction } = useTransaction();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const values = Object.fromEntries(formData.entries());
		const transaction: TransactionI = {
			amount: Number(values.amount),
			category: values.category.toString(),
			date: new Date(values.date.toString()),
			description: values.description.toString(),
		};

		if (
			transaction.amount &&
			transaction.category &&
			transaction.date &&
			transaction.description
		) {
			addTransaction(transaction);
		}
	};

	return (
		<div>
			<form className="grid grid-cols-2 gap-10 p-3" onSubmit={handleSubmit}>
				<input
					type="number"
					name="amount"
					placeholder="Amount"
					className="rounded-md shadow-sm shadow-blue-100 p-2"
				/>
				<input
					type="text"
					name="category"
					placeholder="Category"
					className="rounded-md shadow-sm shadow-blue-100 p-2"
				/>
				<input
					type="date"
					name="date"
					placeholder="Date"
					className="rounded-md shadow-sm shadow-blue-100 p-2"
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					className="rounded-md shadow-sm shadow-blue-100 p-2"
				/>
				<button
					type="submit"
					className="-col-end-1 bg-blue-600 text-white rounded-md shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
				>
					Add
				</button>
			</form>
		</div>
	);
};
