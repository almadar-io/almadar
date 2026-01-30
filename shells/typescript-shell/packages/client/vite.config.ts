import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  // Backend URL: use VITE_API_URL if set, otherwise default to TypeScript backend port
  const backendUrl = env.VITE_API_URL || 'http://localhost:3030';
  const wsUrl = backendUrl.replace('http://', 'ws://').replace('https://', 'wss://');

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@shared': path.resolve(__dirname, '../shared/src'),
      },
    },

    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/ws': {
          target: wsUrl,
          ws: true,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
