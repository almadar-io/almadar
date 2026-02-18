import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeBoard } from './WelcomeBoard';

const meta: Meta<typeof WelcomeBoard> = {
  title: 'Builder/Organisms/WelcomeBoard',
  component: WelcomeBoard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex', backgroundColor: 'var(--color-background)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WelcomeBoard>;

// =============================================================================
// Stories
// =============================================================================

/** Default welcome screen with built-in suggestions */
export const Default: Story = {
  args: {},
};

/** Custom suggestions */
export const CustomSuggestions: Story = {
  args: {
    suggestions: [
      'Hospital management system',
      'Real-time chat with rooms',
      'Inventory tracking for warehouses',
      'Student enrollment portal',
      'Restaurant ordering kiosk',
    ],
  },
};

/** Minimal with fewer suggestions */
export const Minimal: Story = {
  args: {
    suggestions: ['Simple todo app'],
  },
};
