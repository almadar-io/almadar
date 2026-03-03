import type { Meta, StoryObj } from '@storybook/react';
import { EpisodeContinueCard } from './EpisodeContinueCard';

const meta: Meta<typeof EpisodeContinueCard> = {
  title: 'KFlow/Molecules/Story/EpisodeContinueCard',
  component: EpisodeContinueCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EpisodeContinueCard>;

export const NextStory: Story = {
  args: {
    type: 'story',
    title: 'Print Statement Debugging',
    subtitle: 'Story 2 of 3 in this episode',
    storyId: 'story-1b',
  },
};

export const NextEpisode: Story = {
  args: {
    type: 'episode',
    title: 'Off-by-One',
    subtitle: 'Season 1, Episode 2',
    storyId: 'story-2a',
  },
};

export const NextSeason: Story = {
  args: {
    type: 'season',
    title: 'Race Conditions',
    subtitle: 'Season 2, Episode 1',
    storyId: 'story-3a',
  },
};

export const SeriesComplete: Story = {
  args: {
    type: 'series_complete',
    title: 'The Debugging Chronicles',
    subtitle: 'You completed all 4 episodes across 2 seasons!',
    seriesId: 'series-001',
  },
};
