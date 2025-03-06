import styles from './styles.module.scss';

export const Dashboard = () => {
	return (
		<section className="grid grid-cols-2 grid-rows-2 place-items-center gap-4 p-4 w-full h-full">
			<div className="flex flex-col items-center justify-center col-span-2 shadow-md shadow-gray-900 rounded-lg p-4 gap-1.5 w-full h-full">
				<h2>Balance</h2>
			</div>
			<div className="flex items-center justify-center shadow-md shadow-gray-900 rounded-lg p-4 w-full h-full">
				<h2>Resumen</h2>
			</div>
			<div className="flex flex-col items-center justify-center shadow-md shadow-gray-900 rounded-lg p-4 gap-5 w-full h-full">
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
		</section>
	);
};
