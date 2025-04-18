import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
	],
	resolve: {
		alias: {
			'@hooks': '/src/hooks',
			'@config': '/src/config',
			'@models': '/src/models',
			'@services': '/src/services',
			'@shared': '/src/components/shared',
			'@dashboard': '/src/components/dashboard',
			'@transaction': '/src/components/transaction',
		}
	}
});
