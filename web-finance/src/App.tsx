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
		<main className="bg-slate-800 text-white min-w-screen min-h-screen relative flex flex-col items-center justify-center p-15">
			<Header />
			<Dashboard />

			<div
				className={`fixed bg-black bg-opacity-10 flex items-center justify-center transition-opacity duration-300 ${isOpenModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
			>
				<div
					className={`bg-white text-black p-6 rounded-lg shadow-lg transition-transform duration-300 ${isOpenModal ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
				>
					<button
						type="button"
						className="absolute top-3 right-3 text-2xl cursor-pointer"
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
					className="absolute right-15 bottom-15 px-3 py-2 bg-blue-600 text-white rounded-4xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
					onClick={handleOpenModal}
				>
					Agregar transacción
				</button>
			)}
		</main>
	);
}

export default App;
