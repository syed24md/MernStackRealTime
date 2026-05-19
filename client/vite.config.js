import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Redirects API calls to the Express server
      '/api': 'http://localhost:5000'
    }
  }
});