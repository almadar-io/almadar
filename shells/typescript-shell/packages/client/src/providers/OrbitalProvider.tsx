/**
 * OrbitalProvider
 *
 * Unified provider that combines all required contexts for Almadar applications.
 * Provides a single import for both Builder preview and compiled shell.
 *
 * Combines:
 * - ThemeProvider - Theme and color mode management
 * - EventBusProvider - Page-scoped event pub/sub
 * - UISlotProvider - UI slot management for render_ui effects
 * - SelectionProvider - Selected entity tracking
 * - FetchedDataProvider - Server-fetched entity data
 *
 * @packageDocumentation
 */

import React, { type ReactNode } from 'react';
import { ThemeProvider, type ThemeProviderProps, type ThemeDefinition } from '../context/ThemeContext';
import { UISlotProvider } from '../context/UISlotContext';
import { EventBusProvider } from './EventBusProvider';
import { SelectionProvider } from './SelectionProvider';
import { FetchedDataProvider } from './FetchedDataProvider';

// ============================================================================
// Types
// ============================================================================

export interface OrbitalProviderProps {
  children: ReactNode;

  // Theme options
  /** Custom themes (merged with built-in themes) */
  themes?: ThemeDefinition[];
  /** Default theme name */
  defaultTheme?: string;
  /** Default color mode */
  defaultMode?: 'light' | 'dark' | 'system';

  // Debug options
  /** Enable debug logging for all providers */
  debug?: boolean;

  // Data options
  /** Initial fetched data */
  initialData?: Record<string, unknown[]>;
}

// ============================================================================
// Provider Component
// ============================================================================

/**
 * OrbitalProvider - Unified context provider for Almadar applications
 *
 * Wraps your application with all required providers in the correct order.
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <OrbitalProvider>
 *       <Router>
 *         <Routes />
 *       </Router>
 *     </OrbitalProvider>
 *   );
 * }
 *
 * // With configuration
 * function App() {
 *   return (
 *     <OrbitalProvider
 *       defaultTheme="minimalist"
 *       defaultMode="dark"
 *       debug={process.env.NODE_ENV === 'development'}
 *     >
 *       <Router>
 *         <Routes />
 *       </Router>
 *     </OrbitalProvider>
 *   );
 * }
 *
 * // With custom themes from schema
 * import { THEMES } from './generated/theme-manifest';
 *
 * function App() {
 *   return (
 *     <OrbitalProvider themes={THEMES} defaultTheme="ocean">
 *       <Router>
 *         <Routes />
 *       </Router>
 *     </OrbitalProvider>
 *   );
 * }
 * ```
 */
export function OrbitalProvider({
  children,
  themes,
  defaultTheme = 'wireframe',
  defaultMode = 'system',
  debug = false,
  initialData,
}: OrbitalProviderProps): React.ReactElement {
  return (
    <ThemeProvider
      themes={themes}
      defaultTheme={defaultTheme}
      defaultMode={defaultMode}
    >
      <FetchedDataProvider initialData={initialData}>
        <EventBusProvider debug={debug}>
          <UISlotProvider>
            <SelectionProvider debug={debug}>
              {children}
            </SelectionProvider>
          </UISlotProvider>
        </EventBusProvider>
      </FetchedDataProvider>
    </ThemeProvider>
  );
}

OrbitalProvider.displayName = 'OrbitalProvider';

// ============================================================================
// Re-exports for convenience
// ============================================================================

export { ThemeProvider } from '../context/ThemeContext';
export { UISlotProvider } from '../context/UISlotContext';
export { EventBusProvider } from './EventBusProvider';
export { SelectionProvider } from './SelectionProvider';
export { FetchedDataProvider } from './FetchedDataProvider';
