import styles from './styles.module.css';

export const DashboardHead = () => {
	return (
		<section className="col-span-1 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-2 border-2 rounded-xl p-4 w-full h-full">
			<article className="flex flex-col justify-center items-start rounded-md shadow-2xs">
				<header>
					<h2>Balance Mensual</h2>
				</header>
				<div>
					<p>+$25.000</p>
					<span>+10% vs el mes anterior</span>
				</div>
			</article>

			<article className={styles.article}>
				<header>
					<h2>Saldo Disponible</h2>
				</header>
				<div>
					<p>+$25.000</p>
					<span>-5% vs el mes anterior</span>
				</div>
			</article>

			<article className={styles.article}>
				<header>
					<h2>Gastos totales</h2>
				</header>
				<div>
					<p>+$25.000</p>
					<span>+5% vs el mes anterior</span>
				</div>
			</article>

			<article className={styles.article}>
				<header>
					<h2>Ahorros</h2>
				</header>
				<div>
					<p>+$25.000</p>
					<span>+5000 este mes</span>
				</div>
			</article>
		</section>
	);
};
