/**
 * DesignThemeContext - Design theme management
 *
 * Provides design theme state management with:
 * - Wireframe, Minimalist, and Almadar theme options
 * - localStorage persistence
 * - Automatic data-attribute application to document
 *
 * This is separate from light/dark mode (ThemeContext).
 * Design themes control visual styling (shadows, borders, colors).
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type DesignTheme = 'wireframe' | 'minimalist' | 'almadar';

interface DesignThemeContextValue {
    /** Current design theme */
    designTheme: DesignTheme;
    /** Set the design theme */
    setDesignTheme: (theme: DesignTheme) => void;
    /** Available themes */
    availableThemes: readonly DesignTheme[];
}

const DesignThemeContext = createContext<DesignThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'design-theme';
const AVAILABLE_THEMES: readonly DesignTheme[] = ['wireframe', 'minimalist', 'almadar'] as const;

/**
 * Get the initial design theme from localStorage or default to wireframe
 */
function getInitialDesignTheme(): DesignTheme {
    if (typeof window === 'undefined') return 'wireframe';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'wireframe' || stored === 'minimalist' || stored === 'almadar') {
        return stored;
    }
    return 'wireframe';
}

export interface DesignThemeProviderProps {
    children: React.ReactNode;
    /** Default theme if none stored */
    defaultTheme?: DesignTheme;
}

/**
 * DesignThemeProvider component that manages design theme state
 */
export const DesignThemeProvider: React.FC<DesignThemeProviderProps> = ({
    children,
    defaultTheme = 'wireframe',
}) => {
    const [designTheme, setDesignThemeState] = useState<DesignTheme>(() => {
        const initial = getInitialDesignTheme();
        return initial || defaultTheme;
    });

    // Apply theme data attribute to document
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-design-theme', designTheme);
    }, [designTheme]);

    const setDesignTheme = useCallback((newTheme: DesignTheme) => {
        setDesignThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
    }, []);

    return (
        <DesignThemeContext.Provider value={{ designTheme, setDesignTheme, availableThemes: AVAILABLE_THEMES }}>
            {children}
        </DesignThemeContext.Provider>
    );
};

/**
 * Hook to access design theme context
 *
 * @example
 * ```tsx
 * const { designTheme, setDesignTheme, availableThemes } = useDesignTheme();
 *
 * // Switch to minimalist theme
 * <button onClick={() => setDesignTheme('minimalist')}>Minimalist</button>
 *
 * // Render theme selector
 * <select value={designTheme} onChange={(e) => setDesignTheme(e.target.value as DesignTheme)}>
 *   {availableThemes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
 * </select>
 * ```
 */
export function useDesignTheme(): DesignThemeContextValue {
    const context = useContext(DesignThemeContext);
    if (!context) {
        throw new Error('useDesignTheme must be used within a DesignThemeProvider');
    }
    return context;
}

export { DesignThemeContext };
