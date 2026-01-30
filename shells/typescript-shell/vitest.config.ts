import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['packages/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', '**/node_modules/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: [
      // Server-specific aliases (must come before generic @/ to take precedence for server files)
      // These match imports like @/lib/logger, @/services/index from server code
      { find: /^@\/lib(.*)$/, replacement: path.resolve(__dirname, './packages/server/src/lib$1') },
      {
        find: /^@\/services(.*)$/,
        replacement: path.resolve(__dirname, './packages/server/src/services$1'),
      },
      {
        find: /^@\/middleware(.*)$/,
        replacement: path.resolve(__dirname, './packages/server/src/middleware$1'),
      },
      {
        find: /^@\/routes(.*)$/,
        replacement: path.resolve(__dirname, './packages/server/src/routes$1'),
      },
      // Client package aliases
      { find: '@almadar/client', replacement: path.resolve(__dirname, './packages/client/src') },
      { find: /^@\/(.*)$/, replacement: path.resolve(__dirname, './packages/client/src/$1') },
      { find: '@', replacement: path.resolve(__dirname, './packages/client/src') },
      // Server package aliases (without slash)
      { find: '@almadar/server', replacement: path.resolve(__dirname, './packages/server/src') },
      // Shared package aliases
      { find: '@almadar/shared', replacement: path.resolve(__dirname, './packages/shared/src') },
      { find: '@shared', replacement: path.resolve(__dirname, './packages/shared/src') },
      // Component alias for client
      {
        find: '@components',
        replacement: path.resolve(__dirname, './packages/client/src/components'),
      },
    ],
  },
  css: {
    postcss: {},
  },
});
