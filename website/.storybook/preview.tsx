import type { Preview } from '@storybook/react-vite';
import React from 'react';

// Import theme CSS from @almadar/ui
import '../../../packages/almadar-ui/themes/index.css';
import '../../../packages/almadar-ui/index.css';

const preview: Preview = {
    parameters: {
        controls: { disable: true },
        actions: { disable: true },
    },
    decorators: [
        (Story) => (
            <div
                data-theme="minimalist-light"
                style={{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    minHeight: '100vh',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default preview;
