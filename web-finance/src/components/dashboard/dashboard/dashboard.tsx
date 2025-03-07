import type { CreditCardType } from '../../../models/shared/creditCard';
import { Wallet } from '../../shared/wallet/wallet';
import styles from './styles.module.css';

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
	return (
		<section className={styles.dashboard}>
			<div className={styles.headBoxes}>
				<h2>Balance</h2>
			</div>
			<Wallet cards={CARDS} />
			<div className={styles.headBoxes}>
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
		</section>
	);
};
