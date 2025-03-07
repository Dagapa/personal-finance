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

	const cardsLength = creditCards.length;

	return (
		<div className={styles.wallet}>
			<h1>Wallet</h1>
			{creditCards
				.slice()
				.reverse()
				.map((card, _index) => {
					_index = cardsLength - _index - 1;
					const index = { '--index': _index } as CSSProperties;
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
