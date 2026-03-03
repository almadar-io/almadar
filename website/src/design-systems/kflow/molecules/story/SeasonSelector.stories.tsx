import type { Meta, StoryObj } from '@storybook/react';
import { SeasonSelector } from './SeasonSelector';
import { mockSeasons, mockSeriesProgress } from './__mocks__/seriesMockData';

const meta: Meta<typeof SeasonSelector> = {
  title: 'KFlow/Molecules/Story/SeasonSelector',
  component: SeasonSelector,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeasonSelector>;

export const Default: Story = {
  args: {
    seasons: mockSeasons,
    activeSeasonId: 'season-1',
  },
};

export const WithProgress: Story = {
  args: {
    seasons: mockSeasons,
    activeSeasonId: 'season-2',
    seasonProgress: mockSeriesProgress.seasonProgress,
  },
};

export const SingleSeason: Story = {
  args: {
    seasons: [mockSeasons[0]],
    activeSeasonId: 'season-1',
  },
};
