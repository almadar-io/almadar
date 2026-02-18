import type { Meta, StoryObj } from '@storybook/react';
import { StudioStatsTemplate } from './StudioStatsTemplate';
import type { AppStats } from '../organisms/StatsBoard';

const meta: Meta<typeof StudioStatsTemplate> = {
  title: 'Builder/Templates/StudioStatsTemplate',
  component: StudioStatsTemplate,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof StudioStatsTemplate>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const sampleApps: AppStats[] = [
  {
    id: 'app-1',
    name: 'TaskManager',
    updatedAt: now - 3_600_000,
    hasValidationErrors: false,
    stats: { states: 8, events: 12, pages: 4, entities: 3, transitions: 18 },
    domain: { category: 'productivity' },
  },
  {
    id: 'app-2',
    name: 'E-Commerce Store',
    updatedAt: now - 86_400_000,
    hasValidationErrors: true,
    stats: { states: 15, events: 24, pages: 8, entities: 6, transitions: 32 },
    domain: { category: 'commerce' },
  },
  {
    id: 'app-3',
    name: 'CRM Dashboard',
    updatedAt: now - 86_400_000 * 3,
    hasValidationErrors: false,
    stats: { states: 10, events: 18, pages: 5, entities: 4, transitions: 22 },
    domain: { category: 'business' },
  },
  {
    id: 'app-4',
    name: 'Blog Engine',
    updatedAt: now - 86_400_000 * 7,
    hasValidationErrors: false,
    stats: { states: 4, events: 6, pages: 2, entities: 2, transitions: 8 },
    domain: { category: 'content' },
  },
];

// =============================================================================
// Stories
// =============================================================================

/** Default stats template with multiple apps */
export const Default: Story = {
  args: {
    entity: { apps: sampleApps },
  },
};

/** Empty state with no apps */
export const Empty: Story = {
  args: {
    entity: { apps: [] },
  },
};

/** Loading state */
export const Loading: Story = {
  args: {
    entity: { apps: [] },
    isLoading: true,
  },
};

/** Single app */
export const SingleApp: Story = {
  args: {
    entity: { apps: [sampleApps[0]] },
  },
};
