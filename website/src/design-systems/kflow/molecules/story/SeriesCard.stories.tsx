import type { Meta, StoryObj } from '@storybook/react';
import { SeriesCard } from './SeriesCard';
import { mockSeriesSummary, mockCreator } from './__mocks__/seriesMockData';

const meta: Meta<typeof SeriesCard> = {
  title: 'KFlow/Molecules/Story/SeriesCard',
  component: SeriesCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesCard>;

export const Default: Story = {
  args: {
    series: mockSeriesSummary,
  },
};

export const Featured: Story = {
  args: {
    series: { ...mockSeriesSummary, status: 'featured' },
  },
};

export const HighSubscriberCount: Story = {
  args: {
    series: { ...mockSeriesSummary, subscriberCount: 128500, rating: 4.9 },
  },
};

export const NoCoverImage: Story = {
  args: {
    series: { ...mockSeriesSummary, coverImage: undefined },
  },
};

export const Draft: Story = {
  args: {
    series: {
      ...mockSeriesSummary,
      status: 'draft',
      subscriberCount: 0,
      rating: undefined,
      creator: { ...mockCreator, avatar: undefined },
    },
  },
};
