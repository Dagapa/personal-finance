import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@models': '/src/models',
			'@shared': '/src/components/shared',
			'@dashboard': '/src/components/dashboard',
			'@transaction': '/src/components/transaction',
			'@hooks': '/src/hooks'
		}
	}
});
