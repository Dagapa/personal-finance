import styles from './styles.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div>
				<h2>Header</h2>
			</div>
			<nav>
				<ul>
					<li>Home</li>
					<li>Transactions</li>
					<li>Accounts</li>
					<li>budget</li>
				</ul>
			</nav>
			<div>
				<button type="button">User</button>
			</div>
		</header>
	);
};
