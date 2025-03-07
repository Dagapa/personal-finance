import { type CSSProperties, type FC, useState } from 'react';
import { CreditCard, type CreditCardProps } from '../creditCard/creditCard';
import styles from './styles.module.css';

interface WalletProps {
	cards: CreditCardProps[];
}

export const Wallet: FC<WalletProps> = ({ cards }) => {
	const [creditCards, setCreditCards] = useState<CreditCardProps[]>(cards);

	const handleOrderCards = (selectedCard: CreditCardProps) => {
		const updatedCards = creditCards.filter(
			(card) => card.bankName !== selectedCard.bankName,
		);
		updatedCards.unshift(selectedCard);
		setCreditCards(updatedCards);
	};

	return (
		<div className={styles.wallet}>
			<h1>Wallet</h1>
			{creditCards
				.slice()
				.reverse()
				.map((card) => {
					const index = { '--index': card.cardIndex } as CSSProperties;
					return (
						<div
							key={`${card.bankName}_${card.type}_${card.cardholderName}`}
							className={styles.walletCard}
							style={index}
						>
							<CreditCard {...card} onCLick={handleOrderCards} />
						</div>
					);
				})}
		</div>
	);
};
