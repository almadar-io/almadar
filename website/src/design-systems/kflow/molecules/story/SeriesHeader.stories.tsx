import type { Meta, StoryObj } from '@storybook/react';
import { SeriesHeader } from './SeriesHeader';
import { mockSeries } from './__mocks__/seriesMockData';

const meta: Meta<typeof SeriesHeader> = {
  title: 'KFlow/Molecules/Story/SeriesHeader',
  component: SeriesHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesHeader>;

export const Default: Story = {
  args: {
    series: mockSeries,
    isSubscribed: false,
  },
};

export const Subscribed: Story = {
  args: {
    series: mockSeries,
    isSubscribed: true,
  },
};

export const NoBannerImage: Story = {
  args: {
    series: { ...mockSeries, coverImage: undefined },
    isSubscribed: false,
  },
};

export const NoTags: Story = {
  args: {
    series: { ...mockSeries, tags: [] },
    isSubscribed: true,
  },
};
