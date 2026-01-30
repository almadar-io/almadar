/**
 * ThemeContext
 *
 * React context for providing design tokens and theme preferences throughout the application.
 * Patterns can use tokens via the `token` prop which resolves to Tailwind classes.
 *
 * Usage:
 * ```tsx
 * // In App.tsx or layout
 * <ThemeProvider designTokens={schema.designTokens} design={schema.design}>
 *   <App />
 * </ThemeProvider>
 *
 * // In pattern components
 * const { resolveToken, design } = useTheme();
 * const classes = resolveToken('surfaces.glass'); // Returns Tailwind classes
 * ```
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useMemo, useCallback } from 'react';

// ============================================================================
// Types
// ============================================================================

/**
 * Design tokens - reusable Tailwind class collections.
 */
export interface DesignTokens {
  /** Surface styles: backgrounds, borders, shadows */
  surfaces?: Record<string, string>;
  /** Text styles: typography, colors */
  text?: Record<string, string>;
  /** Interactive element styles: buttons, links */
  interactive?: Record<string, string>;
  /** Effect styles: shadows, animations, transitions */
  effects?: Record<string, string>;
  /** Additional custom categories */
  [category: string]: Record<string, string> | undefined;
}

/**
 * Design preferences for visual styling.
 */
export interface DesignPreferences {
  /** Design style */
  style?: 'minimal' | 'modern' | 'playful' | 'data-driven' | 'immersive';
  /** Primary color (hex) */
  primaryColor?: string;
  /** Target device */
  device?: 'mobile' | 'tablet' | 'desktop' | 'all';
  /** Dark mode */
  darkMode?: boolean;
}

/**
 * Theme context value.
 */
export interface ThemeContextValue {
  /** Design tokens registry */
  designTokens: DesignTokens;
  /** Design preferences */
  design: DesignPreferences;
  /** Resolve a token path to Tailwind classes */
  resolveToken: (tokenPath: string | string[]) => string;
  /** Check if dark mode is enabled */
  isDarkMode: boolean;
  /** Get primary color */
  primaryColor: string;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_DESIGN_TOKENS: DesignTokens = {
  surfaces: {
    card: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg',
    muted: 'bg-gray-50 dark:bg-gray-900 rounded-lg',
  },
  text: {
    heading: 'text-xl font-semibold text-gray-900 dark:text-white',
    subheading: 'text-lg font-medium text-gray-700 dark:text-gray-200',
    body: 'text-base text-gray-600 dark:text-gray-400',
    muted: 'text-sm text-gray-500 dark:text-gray-500',
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  },
  interactive: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium transition-colors',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-medium transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg px-4 py-2 transition-colors',
    danger: 'bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-medium transition-colors',
    link: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline',
  },
  effects: {
    shadow: 'shadow-lg',
    'shadow-xl': 'shadow-xl',
    glow: 'shadow-lg shadow-blue-500/20',
    'hover-lift': 'hover:-translate-y-0.5 transition-transform duration-200',
    'hover-scale': 'hover:scale-105 transition-transform duration-200',
    'fade-in': 'animate-fade-in',
  },
};

const DEFAULT_DESIGN_PREFERENCES: DesignPreferences = {
  style: 'modern',
  primaryColor: '#3b82f6',
  device: 'all',
  darkMode: false,
};

// ============================================================================
// Token Resolver
// ============================================================================

/**
 * Resolve a token path (e.g., "surfaces.glass") to Tailwind classes.
 *
 * @param tokenPath - Token path like "surfaces.glass" or array of paths
 * @param tokens - Design tokens registry
 * @returns Resolved Tailwind classes or empty string if not found
 */
export function resolveTokenPath(
  tokenPath: string | string[],
  tokens: DesignTokens
): string {
  // Handle array of token paths - resolve each and join
  if (Array.isArray(tokenPath)) {
    return tokenPath
      .map((path) => resolveTokenPath(path, tokens))
      .filter(Boolean)
      .join(' ');
  }

  // Handle single token path
  const parts = tokenPath.split('.');
  if (parts.length !== 2) {
    // Invalid path format, return empty
    return '';
  }

  const [category, name] = parts;
  const categoryTokens = tokens[category];

  if (!categoryTokens || typeof categoryTokens !== 'object') {
    return '';
  }

  return categoryTokens[name] ?? '';
}

/**
 * Merge resolved tokens with custom className.
 *
 * @param tokenPath - Token path(s) to resolve
 * @param className - Additional custom classes
 * @param tokens - Design tokens registry
 * @returns Combined class string
 */
export function mergeTokenClasses(
  tokenPath: string | string[] | undefined,
  className: string | undefined,
  tokens: DesignTokens
): string {
  const parts: string[] = [];

  if (tokenPath) {
    const resolved = resolveTokenPath(tokenPath, tokens);
    if (resolved) parts.push(resolved);
  }

  if (className) {
    parts.push(className);
  }

  return parts.join(' ');
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

export interface ThemeProviderProps {
  /** Design tokens registry */
  designTokens?: DesignTokens;
  /** Design preferences */
  design?: DesignPreferences;
  /** Children to render */
  children: React.ReactNode;
}

/**
 * Provider component that provides theme context to the application.
 *
 * Merges provided tokens with defaults so there's always a fallback.
 */
export function ThemeProvider({
  designTokens,
  design,
  children,
}: ThemeProviderProps): React.ReactElement {
  // Merge provided tokens with defaults
  const mergedTokens = useMemo<DesignTokens>(() => {
    if (!designTokens) return DEFAULT_DESIGN_TOKENS;

    return {
      ...DEFAULT_DESIGN_TOKENS,
      ...designTokens,
      // Deep merge each category
      surfaces: { ...DEFAULT_DESIGN_TOKENS.surfaces, ...designTokens.surfaces },
      text: { ...DEFAULT_DESIGN_TOKENS.text, ...designTokens.text },
      interactive: { ...DEFAULT_DESIGN_TOKENS.interactive, ...designTokens.interactive },
      effects: { ...DEFAULT_DESIGN_TOKENS.effects, ...designTokens.effects },
    };
  }, [designTokens]);

  // Merge design preferences with defaults
  const mergedDesign = useMemo<DesignPreferences>(() => ({
    ...DEFAULT_DESIGN_PREFERENCES,
    ...design,
  }), [design]);

  // Create resolver function
  const resolveToken = useCallback(
    (tokenPath: string | string[]) => resolveTokenPath(tokenPath, mergedTokens),
    [mergedTokens]
  );

  // Build context value
  const contextValue = useMemo<ThemeContextValue>(() => ({
    designTokens: mergedTokens,
    design: mergedDesign,
    resolveToken,
    isDarkMode: mergedDesign.darkMode ?? false,
    primaryColor: mergedDesign.primaryColor ?? '#3b82f6',
  }), [mergedTokens, mergedDesign, resolveToken]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access the theme context.
 *
 * Returns default values if used outside of ThemeProvider (for resilience).
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { resolveToken, isDarkMode } = useTheme();
 *   const cardClasses = resolveToken('surfaces.card');
 *   return <div className={cardClasses}>...</div>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  // Return defaults if not in provider (for resilience)
  if (!context) {
    return {
      designTokens: DEFAULT_DESIGN_TOKENS,
      design: DEFAULT_DESIGN_PREFERENCES,
      resolveToken: (tokenPath) => resolveTokenPath(tokenPath, DEFAULT_DESIGN_TOKENS),
      isDarkMode: false,
      primaryColor: '#3b82f6',
    };
  }

  return context;
}

// ============================================================================
// Utility Hook for Pattern Props
// ============================================================================

/**
 * Hook to resolve pattern styling props (token + className).
 *
 * Use this in pattern components to combine token resolution with custom classes.
 *
 * @example
 * ```tsx
 * function CardPattern({ token, className, ...props }) {
 *   const classes = usePatternClasses(token, className);
 *   return <div className={classes}>...</div>;
 * }
 * ```
 */
export function usePatternClasses(
  token?: string | string[],
  className?: string
): string {
  const { designTokens } = useTheme();
  return useMemo(
    () => mergeTokenClasses(token, className, designTokens),
    [token, className, designTokens]
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  ThemeContext,
  DEFAULT_DESIGN_TOKENS,
  DEFAULT_DESIGN_PREFERENCES,
};
