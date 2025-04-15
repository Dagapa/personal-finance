import { useState } from 'react';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Header } from './components/shared/header/header';
import { Transaction } from './components/transaction/transaction';

function App() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const handleOpenModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	return (
		<main className="flex flex-col gap-4">
			<Header />
			<Dashboard />

			{/* <div>
				<div>
					<button
						type="button"
						onClick={handleOpenModal}
					>
						X
					</button>
					<Transaction />
				</div>
			</div>

			{!isOpenModal && (
				<button
					type="button"
					onClick={handleOpenModal}
				>
					Agregar transacción
				</button>
			)} */}
		</main>
	);
}

export default App;
