import type { Meta, StoryObj } from '@storybook/react';
import { SeriesViewBoard } from './SeriesViewBoard';
import {
  mockSeries,
  mockStoryMap,
  mockSeriesProgress,
  mockCreatorOtherSeries,
} from '../molecules/story/__mocks__/seriesMockData';

const meta: Meta<typeof SeriesViewBoard> = {
  title: 'KFlow/Organisms/SeriesViewBoard',
  component: SeriesViewBoard,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesViewBoard>;

export const Default: Story = {
  args: {
    entity: {
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: true,
      progress: mockSeriesProgress,
      creatorOtherSeries: mockCreatorOtherSeries,
    },
  },
};

export const WithoutProgress: Story = {
  args: {
    entity: {
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: false,
    },
  },
};

export const WithoutCreatorSeries: Story = {
  args: {
    entity: {
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: true,
      progress: mockSeriesProgress,
    },
  },
};

export const SingleSeason: Story = {
  args: {
    entity: {
      series: { ...mockSeries, seasons: [mockSeries.seasons[0]] },
      storyMap: mockStoryMap,
      isSubscribed: false,
    },
  },
};
