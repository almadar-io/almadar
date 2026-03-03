import type { Meta, StoryObj } from '@storybook/react';
import { SeriesViewTemplate } from './SeriesViewTemplate';
import {
  mockSeries,
  mockStoryMap,
  mockSeriesProgress,
  mockCreatorOtherSeries,
} from '../molecules/story/__mocks__/seriesMockData';

const meta: Meta<typeof SeriesViewTemplate> = {
  title: 'KFlow/Templates/SeriesViewTemplate',
  component: SeriesViewTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesViewTemplate>;

export const Default: Story = {
  args: {
    entity: {
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: true,
      progress: mockSeriesProgress,
      creatorOtherSeries: mockCreatorOtherSeries,
      shell: {
        activeRoute: 'series',
        user: { name: 'Test User', avatar: 'https://placehold.co/32x32/6366f1/ffffff?text=TU' },
      },
    },
  },
};

export const NotSignedIn: Story = {
  args: {
    entity: {
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: false,
      shell: { activeRoute: 'series' },
    },
  },
};
