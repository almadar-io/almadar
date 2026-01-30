/**
 * ThemeContext - Theme management with dark/light mode support
 *
 * Provides theme state management with:
 * - Light, dark, and system theme options
 * - localStorage persistence
 * - System preference detection
 * - Automatic class application to document
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** Current theme setting */
  theme: Theme;
  /** Resolved theme (what's actually applied) */
  resolvedTheme: ResolvedTheme;
  /** Set the theme */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';

/**
 * Get the system's preferred color scheme
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get the initial theme from localStorage or default to system
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
}

/**
 * Resolve a theme setting to an actual light/dark value
 */
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme if none stored */
  defaultTheme?: Theme;
}

/**
 * ThemeProvider component that manages theme state and applies it to the document
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Apply theme class to document
  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    // Also set a data attribute for debugging
    root.setAttribute('data-theme', resolved);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    // Use functional update to avoid stale closure issues
    setThemeState(currentTheme => {
      const currentResolved = resolveTheme(currentTheme);
      const newTheme: Theme = currentResolved === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 *
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *
 * // Toggle between light and dark
 * <button onClick={toggleTheme}>Toggle Theme</button>
 *
 * // Set specific theme
 * <button onClick={() => setTheme('dark')}>Dark Mode</button>
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
