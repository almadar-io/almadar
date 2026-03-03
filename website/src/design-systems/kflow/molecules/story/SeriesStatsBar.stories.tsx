import type { Meta, StoryObj } from '@storybook/react';
import { SeriesStatsBar } from './SeriesStatsBar';

const meta: Meta<typeof SeriesStatsBar> = {
  title: 'KFlow/Molecules/Story/SeriesStatsBar',
  component: SeriesStatsBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesStatsBar>;

export const Default: Story = {
  args: {
    totalEpisodes: 4,
    totalStories: 9,
    totalDurationMinutes: 85,
    averageRating: 4.7,
    completionPercent: 55,
  },
};

export const WithoutOptionalStats: Story = {
  args: {
    totalEpisodes: 4,
    totalStories: 9,
    totalDurationMinutes: 85,
  },
};

export const ShortDuration: Story = {
  args: {
    totalEpisodes: 1,
    totalStories: 2,
    totalDurationMinutes: 15,
    averageRating: 4.2,
  },
};

export const FullCompletion: Story = {
  args: {
    totalEpisodes: 10,
    totalStories: 35,
    totalDurationMinutes: 240,
    averageRating: 4.9,
    completionPercent: 100,
  },
};
