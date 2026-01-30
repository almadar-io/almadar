/**
 * ThemeSelector - Design theme selector component
 *
 * A dropdown/toggle component for switching between design themes.
 *
 * @packageDocumentation
 */

import React from 'react';
import { useDesignTheme, type DesignTheme } from '../../contexts/DesignThemeContext';

interface ThemeSelectorProps {
    /** Optional className */
    className?: string;
    /** Show as dropdown or buttons */
    variant?: 'dropdown' | 'buttons';
    /** Show labels */
    showLabels?: boolean;
}

const THEME_LABELS: Record<DesignTheme, { label: string; icon: string; description: string }> = {
    wireframe: {
        label: 'Wireframe',
        icon: '📐',
        description: 'Sharp corners, thick borders',
    },
    minimalist: {
        label: 'Minimalist',
        icon: '✨',
        description: 'Clean, subtle, refined',
    },
    almadar: {
        label: 'Almadar',
        icon: '💎',
        description: 'Teal gradients, glowing accents',
    },
};

/**
 * ThemeSelector component for switching design themes
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
    className = '',
    variant = 'dropdown',
    showLabels = true,
}) => {
    const { designTheme, setDesignTheme, availableThemes } = useDesignTheme();

    if (variant === 'buttons') {
        return (
            <div className={`flex gap-2 ${className}`}>
                {availableThemes.map((theme) => {
                    const { label, icon } = THEME_LABELS[theme];
                    const isActive = designTheme === theme;

                    return (
                        <button
                            key={theme}
                            onClick={() => setDesignTheme(theme)}
                            className={`
                px-3 py-2 text-sm font-medium transition-all
                border-[length:var(--border-width)] rounded-[var(--radius-sm)]
                ${isActive
                                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]'
                                    : 'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] border-[var(--color-border)] hover:bg-[var(--color-secondary-hover)]'
                                }
              `}
                            title={THEME_LABELS[theme].description}
                        >
                            {icon} {showLabels && label}
                        </button>
                    );
                })}
            </div>
        );
    }

    // Dropdown variant
    return (
        <div className={`relative ${className}`}>
            <select
                value={designTheme}
                onChange={(e) => setDesignTheme(e.target.value as DesignTheme)}
                className={`
          px-3 py-2 pr-8 text-sm font-medium
          bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]
          border-[length:var(--border-width)] border-[var(--color-border)]
          rounded-[var(--radius-sm)]
          cursor-pointer appearance-none
          focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]
        `}
            >
                {availableThemes.map((theme) => {
                    const { label, icon } = THEME_LABELS[theme];
                    return (
                        <option key={theme} value={theme}>
                            {icon} {label}
                        </option>
                    );
                })}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default ThemeSelector;
