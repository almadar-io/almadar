import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      // Fix for property-information v7 which removed subpath exports
      'property-information/html': 'property-information',
      'property-information/svg': 'property-information',
      'property-information/normalize': 'property-information',
      'property-information/find': 'property-information',
    },
  },
  optimizeDeps: {
    include: ['zustand'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
