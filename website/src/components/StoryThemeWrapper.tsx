import React from 'react';
import { useTranslate } from '@almadar/ui';

// Import @almadar/ui theme CSS — provides data-theme CSS variable definitions.
// Tailwind utilities come from custom.css via @tailwind components/utilities.
// We do NOT import index.css here — its @tailwind base conflicts with Docusaurus resets.
import '../design-systems/almadar-ui/themes/index.css';

interface StoryThemeWrapperProps {
    children: React.ReactNode;
    /** Theme name from @almadar/ui (e.g. "ocean-light", "midnight-dark") */
    theme?: string;
}

/**
 * Wraps composed stories with a theme context.
 * Each demo can use a different theme for visual variety.
 *
 * I18nProvider is at the Docusaurus Root level (src/theme/Root.tsx)
 * so that lazy-loaded demo components share the same React context.
 * This component only reads `direction` for RTL support.
 */
export default function StoryThemeWrapper({ children, theme = 'minimalist-light' }: StoryThemeWrapperProps): React.JSX.Element {
    const { direction } = useTranslate();
    const isDark = theme.endsWith('-dark');
    return (
        <div
            data-theme={theme}
            dir={direction}
            style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                minHeight: '100%',
                colorScheme: isDark ? 'dark' : 'light',
            }}
        >
            {children}
        </div>
    );
}
