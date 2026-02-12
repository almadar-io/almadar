import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import React from 'react';

// Import theme CSS from @almadar/ui (resolved via alias to source)
import '../../../packages/almadar-ui/themes/index.css';
import '../../../packages/almadar-ui/index.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    decorators: [
        withThemeByDataAttribute({
            themes: {
                'Minimalist Light': 'minimalist-light',
                'Minimalist Dark': 'minimalist-dark',
                'Almadar Light': 'almadar-light',
                'Almadar Dark': 'almadar-dark',
                'Wireframe Light': 'wireframe-light',
                'Wireframe Dark': 'wireframe-dark',
                'Ocean Light': 'ocean-light',
                'Ocean Dark': 'ocean-dark',
                'Forest Light': 'forest-light',
                'Forest Dark': 'forest-dark',
                'Sunset Light': 'sunset-light',
                'Sunset Dark': 'sunset-dark',
                'Lavender Light': 'lavender-light',
                'Lavender Dark': 'lavender-dark',
                'Rose Light': 'rose-light',
                'Rose Dark': 'rose-dark',
                'Slate Light': 'slate-light',
                'Slate Dark': 'slate-dark',
                'Ember Light': 'ember-light',
                'Ember Dark': 'ember-dark',
                'Midnight Light': 'midnight-light',
                'Midnight Dark': 'midnight-dark',
                'Sand Light': 'sand-light',
                'Sand Dark': 'sand-dark',
                'Neon Light': 'neon-light',
                'Neon Dark': 'neon-dark',
                'Arctic Light': 'arctic-light',
                'Arctic Dark': 'arctic-dark',
                'Copper Light': 'copper-light',
                'Copper Dark': 'copper-dark',
                'Trait Wars': 'trait-wars-dark',
            },
            defaultTheme: 'Minimalist Light',
            attributeName: 'data-theme',
        }),
        (Story) => (
            <div style={{
                padding: '1rem',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                minHeight: '100vh',
            }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
