import type { Meta, StoryObj } from '@storybook/react';
import { EpisodeCard } from './EpisodeCard';
import { mockEpisodes } from './__mocks__/seriesMockData';

const meta: Meta<typeof EpisodeCard> = {
  title: 'KFlow/Molecules/Story/EpisodeCard',
  component: EpisodeCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EpisodeCard>;

export const Default: Story = {
  args: {
    episode: mockEpisodes[0],
  },
};

export const SingleStory: Story = {
  args: {
    episode: mockEpisodes[1],
  },
};

export const WithStoryTitles: Story = {
  args: {
    episode: mockEpisodes[0],
    storyTitles: ['The Moth in the Machine', 'Print Statement Debugging', 'The Debugger'],
  },
};

export const Completed: Story = {
  args: {
    episode: mockEpisodes[0],
    progress: {
      episodeId: 'ep-1',
      storiesCompleted: 3,
      storiesTotal: 3,
      status: 'completed',
    },
  },
};

export const InProgress: Story = {
  args: {
    episode: mockEpisodes[2],
    progress: {
      episodeId: 'ep-3',
      storiesCompleted: 1,
      storiesTotal: 2,
      status: 'in_progress',
    },
  },
};

export const CurrentlyPlaying: Story = {
  args: {
    episode: mockEpisodes[2],
    isCurrentlyPlaying: true,
    progress: {
      episodeId: 'ep-3',
      storiesCompleted: 1,
      storiesTotal: 2,
      status: 'in_progress',
    },
  },
};

export const NotStarted: Story = {
  args: {
    episode: mockEpisodes[3],
    progress: {
      episodeId: 'ep-4',
      storiesCompleted: 0,
      storiesTotal: 3,
      status: 'not_started',
    },
  },
};
