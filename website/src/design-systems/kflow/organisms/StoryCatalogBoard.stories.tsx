import type { Meta, StoryObj } from '@storybook/react';
import { StoryCatalogBoard } from './StoryCatalogBoard';
import type { StoryCatalogEntity } from './StoryCatalogBoard';

const meta: Meta<typeof StoryCatalogBoard> = {
  title: 'KFlow/Organisms/StoryCatalogBoard',
  component: StoryCatalogBoard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryCatalogBoard>;

const sampleStories: StoryCatalogEntity = {
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
      id: 'the-first-count',
      title: 'The First Count',
      teaser: "How did humans go from 'some sheep' to 'exactly 247 sheep'?",
      domain: 'math',
      difficulty: 'beginner',
      duration: 10,
      rating: 4.7,
      playCount: 1120,
    },
    {
      id: 'the-star-map',
      title: 'The Star Map',
      teaser: 'How did ancient people know when to plant crops without calendars?',
      domain: 'science',
      difficulty: 'beginner',
      duration: 10,
      rating: 4.6,
      playCount: 980,
    },
    {
      id: 'the-grain-counter',
      title: 'The Grain Counter',
      teaser: 'What if nobody could prove how much grain the temple had?',
      domain: 'history',
      difficulty: 'beginner',
      duration: 10,
      coverImage: 'https://almadar-kflow-assets.web.app/stories/the-grain-counter/cover.png',
      rating: 4.5,
      playCount: 870,
    },
    {
      id: 'the-merchants-scale',
      title: "The Merchant's Scale",
      teaser: 'A medieval merchant receives a gold coin. Is it real?',
      domain: 'history',
      difficulty: 'beginner',
      duration: 10,
      coverImage: 'https://almadar-kflow-assets.web.app/stories/the-merchants-scale/cover.png',
      rating: 4.5,
      playCount: 1520,
    },
    {
      id: 'the-perfect-throw',
      title: 'The Perfect Throw',
      teaser: 'At what angle should you throw a ball to make it go the farthest?',
      domain: 'science',
      difficulty: 'beginner',
      duration: 10,
      coverImage: 'https://almadar-kflow-assets.web.app/stories/the-perfect-throw/cover.png',
      rating: 4.8,
      playCount: 2100,
    },
    {
      id: 'the-hot-gates',
      title: 'The Hot Gates',
      teaser: 'How 300 Spartans held the line against an empire.',
      domain: 'history',
      difficulty: 'intermediate',
      duration: 15,
      coverImage: 'https://almadar-kflow-assets.web.app/stories/the-hot-gates/cover.png',
      rating: 4.9,
      playCount: 2340,
    },
    {
      id: 'mars-bug',
      title: 'The $125 Million Bug',
      teaser: 'How a unit conversion error destroyed a Mars orbiter.',
      domain: 'science',
      difficulty: 'beginner',
      duration: 12,
      coverImage: 'https://almadar-kflow-assets.web.app/stories/the-125-million-bug/cover.png',
      rating: 4.8,
      playCount: 2340,
    },
    {
      id: 'bridge-sway',
      title: 'The Bridge That Swayed',
      teaser: "London's Millennium Bridge wobbles on opening day.",
      domain: 'engineering',
      difficulty: 'intermediate',
      duration: 14,
      rating: 4.7,
      playCount: 980,
    },
    {
      id: 'password-wasnt',
      title: "The Password That Wasn't",
      teaser: 'A hacker breaks into a "secure" system in 3 minutes.',
      domain: 'tech',
      difficulty: 'intermediate',
      duration: 13,
      rating: 4.6,
      playCount: 1870,
    },
    {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Can two rational opponents always find a better deal?',
      domain: 'math',
      difficulty: 'advanced',
      duration: 15,
      rating: 4.9,
      playCount: 890,
    },
  ],
};

export const Default: Story = {
  args: { entity: sampleStories },
};

export const FilteredDomain: Story = {
  args: {
    entity: { ...sampleStories, selectedDomain: 'tech' },
  },
};

export const NoFeatured: Story = {
  args: {
    entity: { ...sampleStories, featuredStory: undefined },
  },
};

export const Empty: Story = {
  args: {
    entity: { stories: [], domains: ['science', 'tech'], selectedDomain: 'science' },
  },
};
