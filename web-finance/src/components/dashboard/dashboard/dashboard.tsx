import { DashboardHead } from '@dashboard/dashboardHead/dashboardHead';
import type { CreditCardType } from '@models/shared/creditCard';
import { Wallet } from '@shared/wallet/wallet';
import useTransactions from '@hooks/useTransaction';
import { Graph } from '@shared/graph/graph';

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
	const { transactions } = useTransactions();

	console.log(transactions)

	return (
		<section className="grid grid-cols-3 grid-rows-auto gap-4">
			<DashboardHead />
			<div className='col-span-2'>
				<h2>Resumen</h2>
				<div className='w-fit h-fit min-w-[600px] min-h-[400px] flex justify-center items-center'>
					<Graph />
				</div>
			</div>
			<div className='col-span-2'>
				<h2 className="text-xl">Transacciones de hoy</h2>
				<ul className="flex flex-col gap-4 w-full">
					<li className="flex items-center center gap-1.5 text-sm text-zinc-300">
						<span>$ -3000</span>
						<p>House reparations</p>
					</li>
					<li className="flex items-center center gap-2 text-sm text-zinc-300">
						<span>$ -1000</span>
						<p>Travel to the Europe</p>
					</li>
					<li className="flex items-center center gap-2 text-sm text-zinc-300">
						<span>$ -20</span>
						<p>Buy cookies</p>
					</li>
				</ul>
			</div>
			<div className='flex justify-center items-center'>
				<button
					className='w-fit h-fit bg-blue-500 text-white rounded-3xl p-4 cursor-pointer'
					type='button'>
					Agregar transacción
				</button>
			</div>
		</section>
	);
};
