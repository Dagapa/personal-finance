import { DashboardHead } from '@dashboard/dashboardHead/dashboardHead';
import type { CreditCardType } from '@models/shared/creditCard';
import { Wallet } from '@shared/wallet/wallet';
import useTransactions from '@hooks/useTransaction';
import { Graph } from '@shared/graph/graph';
import { Table } from '@shared/table/table';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TransactionModal } from '@shared/modals/transaction/transactionModal';

const CARDS = [
	{
		cardIndex: 1,
		bankName: 'Davivienda',
		cardholderName: 'JOHN DOE',
		type: 'visa' as CreditCardType,
	},
	{
		cardIndex: 2,
		bankName: 'NEQUI',
		cardholderName: 'JOHN DOE',
		type: 'mastercard' as CreditCardType,
	},
	{
		cardIndex: 3,
		bankName: 'BANCOLOMBIA',
		cardholderName: 'JOHN DOE',
		type: 'mastercard' as CreditCardType,
	},
	{
		cardIndex: 4,
		bankName: 'NUBANK',
		cardholderName: 'JOHN DOE',
		type: 'mastercard' as CreditCardType,
	},
];

export const Dashboard = () => {
	const { transactions, addTransaction } = useTransactions();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const modalRoot = document.getElementById('modal-root');
		if (!modalRoot) {
			const div = document.createElement('div');
			div.id = 'modal-root';
			document.body.appendChild(div);
		}
	}, []);

	return (
		<div>
			<section className="grid grid-cols-3 grid-rows-2 gap-6">
				<DashboardHead />
				<div className='flex flex-col w-full h-full col-span-2 rounded-4xl p-4 bg-gray-900'>
					<h2 className='h-full text-3xl font-bold'>Resumen</h2>
					<div className='w-full h-fit min-w-[600px] min-h-[400px] flex justify-center items-center'>
						<Graph />
					</div>
				</div>
				<div className='flex flex-col w-full h-full col-span-2 rounded-4xl p-4 bg-gray-900'>
					<h2 className="text-xl">Ultimas transacciones</h2>
					<Table data={transactions} />
				</div>
				<div className='flex justify-center items-center'>
					<button
						className='w-fit h-fit bg-blue-500 text-white rounded-3xl p-4 cursor-pointer'
						type='button'
						onClick={() => setIsModalOpen(true)}
					>
						Agregar transacción
					</button>
				</div>
			</section>
			<TransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddTransaction={addTransaction}
			/>
		</div>
	);
};
