import type { Meta, StoryObj } from '@storybook/react';
import { StoryCatalogTemplate } from './StoryCatalogTemplate';
import type { StoryCatalogEntity } from './StoryCatalogTemplate';
import { mockSeriesSummary, mockCreatorOtherSeries } from '../molecules/story/__mocks__/seriesMockData';

const meta: Meta<typeof StoryCatalogTemplate> = {
  title: 'KFlow/Templates/StoryCatalogTemplate',
  component: StoryCatalogTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryCatalogTemplate>;

const catalog: StoryCatalogEntity = {
  domains: ['science', 'history', 'engineering', 'tech', 'math'],
  featuredStory: {
    id: 'mars-bug',
    title: 'The $125 Million Bug',
    teaser: 'How a unit conversion error destroyed a Mars orbiter — and how you can prevent it.',
    domain: 'science',
    difficulty: 'beginner',
    duration: 12,
    rating: 4.8,
    playCount: 2340,
  },
  stories: [
    {
      id: 'mars-bug',
      title: 'The $125 Million Bug',
      teaser: 'A unit conversion error destroyed a Mars orbiter.',
      domain: 'science',
      difficulty: 'beginner',
      duration: 12,
      rating: 4.8,
      playCount: 2340,
    },
    {
      id: 'merchants-scale',
      title: "The Merchant's Scale",
      teaser: 'Is that gold coin real? Archimedes knew how to tell.',
      domain: 'history',
      difficulty: 'beginner',
      duration: 10,
      rating: 4.5,
      playCount: 1520,
    },
    {
      id: 'bridge-sway',
      title: 'The Bridge That Swayed',
      teaser: "London's Millennium Bridge wobbled. Resonance was the culprit.",
      domain: 'engineering',
      difficulty: 'intermediate',
      duration: 14,
      rating: 4.7,
      playCount: 980,
    },
    {
      id: 'password-wasnt',
      title: "The Password That Wasn't",
      teaser: 'A hacker broke in. The password was 12 characters.',
      domain: 'tech',
      difficulty: 'intermediate',
      duration: 13,
      rating: 4.6,
      playCount: 1870,
    },
    {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Game theory says rational self-interest can produce irrational outcomes.',
      domain: 'math',
      difficulty: 'advanced',
      duration: 15,
      rating: 4.9,
      playCount: 890,
    },
  ],
};

export const Default: Story = {
  args: { entity: catalog },
};

export const WithSeriesTab: Story = {
  args: {
    entity: {
      ...catalog,
      series: [mockSeriesSummary, ...mockCreatorOtherSeries],
    },
  },
};

export const WithSeriesStories: Story = {
  name: 'Stories With Series Badges',
  args: {
    entity: {
      ...catalog,
      stories: [
        ...catalog.stories.slice(0, 2),
        { ...catalog.stories[2], seriesId: 'series-001' },
        { ...catalog.stories[3], seriesId: 'series-002' },
        catalog.stories[4],
      ],
      series: [mockSeriesSummary, ...mockCreatorOtherSeries],
    },
  },
};
