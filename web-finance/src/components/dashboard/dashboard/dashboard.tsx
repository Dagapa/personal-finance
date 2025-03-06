import { CreditCard } from '../../shared/creditCard/creditCard';
import styles from './styles.module.css';

export const Dashboard = () => {
	return (
		<section className={styles.dashboard}>
			<div className={styles.head_boxes}>
				<h2>Balance</h2>
			</div>
			<div className={styles.head_boxes}>
				<h2>Resumen</h2>
			</div>
			<div className={styles.summary}>
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
			<CreditCard bankName="Davivienda" />
		</section>
	);
};
