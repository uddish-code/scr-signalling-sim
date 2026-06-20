// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public', // Build straight into the backend folder
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
