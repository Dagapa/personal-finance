import { DashboardHead } from '@dashboard/dashboardHead/dashboardHead';
import type { CreditCardType } from '@models/shared/creditCard';
import { Wallet } from '@shared/wallet/wallet';
import useTransactions from '@hooks/useTransaction';
import { Graph } from '@shared/graph/graph';
import { Table } from '@shared/table/table';

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

const exampleData = [
	{
		id: 1,
		nombre: "Juan Pérez",
		email: "juan@example.com",
		rol: "Administrador",
		estado: "Activo",
		fechaRegistro: "2023-01-15",
	},
	{
		id: 2,
		nombre: "María López",
		email: "maria@example.com",
		rol: "Editor",
		estado: "Inactivo",
		fechaRegistro: "2023-02-20",
	},
	{
		id: 3,
		nombre: "Carlos Rodríguez",
		email: "carlos@example.com",
		rol: "Usuario",
		estado: "Activo",
		fechaRegistro: "2023-03-10",
	},
	{
		id: 4,
		nombre: "Ana Martínez",
		email: "ana@example.com",
		rol: "Editor",
		estado: "Activo",
		fechaRegistro: "2023-04-05",
	},
	{
		id: 5,
		nombre: "Roberto Sánchez",
		email: "roberto@example.com",
		rol: "Usuario",
		estado: "Inactivo",
		fechaRegistro: "2023-05-12",
	},
]

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
				<h2 className="text-xl">Ultimas transacciones</h2>
				<Table data={exampleData} />
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
