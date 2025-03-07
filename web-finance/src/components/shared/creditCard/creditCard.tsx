import type { CreditCardType } from '../../../models/shared/creditCard';
import styles from './styles.module.css';

export interface CreditCardProps {
	cardIndex: number;
	bankName?: string;
	type?: CreditCardType;
	cardholderName?: string;
	onCLick?: (card: CreditCardProps) => void;
}

export function CreditCard({
	cardIndex,
	type = 'visa',
	bankName = 'NEQUI',
	cardholderName = 'JOHN DOE',
	onCLick,
}: CreditCardProps) {
	return (
		<div
			className={`${styles.creditCardContainer}`}
			onClick={() => onCLick?.({ cardIndex, bankName, type, cardholderName })}
		>
			<div className={`${styles.creditCard}`}>
				<div className={styles.cardFront}>
					<div className={styles.cardContent}>
						<div className={styles.cardTop}>
							<div className={styles.cardChip}>
								<div className={styles.chipInner}>
									<div className={styles.chipLine} />
								</div>
							</div>
							<div className={styles.contactless}>
								<div className={styles.contactlessWave} />
								<div className={styles.contactlessWave} />
								<div className={styles.contactlessWave} />
							</div>
						</div>

						<div className={styles.cardNumber}>{bankName}</div>

						<div className={styles.cardBottom}>
							<div className={styles.cardholderInfo}>
								<div className={styles.cardLabel}>Card Holder</div>
								<div className={styles.cardholderName}>{cardholderName}</div>
							</div>

							<div className={styles.cardType}>
								{type === 'visa' && <div className={styles.visaLogo}>VISA</div>}
								{type === 'mastercard' && (
									<div className={styles.mastercardLogo}>
										<div className={styles.mastercardCircleRed} />
										<div className={styles.mastercardCircleYellow} />
									</div>
								)}
								{type === 'amex' && <div className={styles.amexLogo}>AMEX</div>}
								{type === 'discover' && (
									<div className={styles.discoverLogo}>DISCOVER</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
