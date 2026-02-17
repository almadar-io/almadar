import React from 'react';

/**
 * Wraps composed stories with the same theme context that .storybook/preview.tsx used.
 * Replaces the Storybook decorator for production rendering.
 */
export default function StoryThemeWrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <div
            data-theme="minimalist-light"
            style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                minHeight: '100%',
            }}
        >
            {children}
        </div>
    );
}
