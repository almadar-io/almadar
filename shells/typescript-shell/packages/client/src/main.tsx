/**
 * Application Entry Point
 *
 * Uses unified ThemeProvider with data-theme="name-light/dark" attribute.
 * Theme configuration is loaded from generated/theme-config.ts
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './features/auth';
import { ThemeProvider } from './context';
import { THEMES, DEFAULT_THEME, DEFAULT_MODE } from './generated/theme-config';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider themes={THEMES} defaultTheme={DEFAULT_THEME} defaultMode={DEFAULT_MODE}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
