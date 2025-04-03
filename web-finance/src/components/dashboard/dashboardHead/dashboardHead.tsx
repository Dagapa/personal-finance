import styles from './styles.module.css';

export const DashboardHead = () => {
	return (
		<section className={styles.dashboardHead}>
			<article className={styles.article}>
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
