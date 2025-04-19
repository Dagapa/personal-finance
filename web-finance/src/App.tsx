import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Header } from './components/shared/header/header';

function App() {

	return (
		<main className="flex flex-col gap-4">
			<Header />
			<Dashboard />
		</main>
	);
}

export default App;
