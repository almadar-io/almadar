import type { Meta, StoryObj } from '@storybook/react';
import { StoryCard } from './StoryCard';

const meta: Meta<typeof StoryCard> = {
  title: 'KFlow/Molecules/Story/StoryCard',
  component: StoryCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryCard>;

export const Default: Story = {
  args: {
    story: {
      id: 'mars-bug',
      title: 'The $125 Million Bug',
      teaser: 'How a unit conversion error destroyed a Mars orbiter — and how you can prevent it.',
      domain: 'natural',
      difficulty: 'beginner',
      duration: 12,
      rating: 4.8,
      playCount: 2340,
    },
    onClick: () => {},
  },
};

export const WithCoverImage: Story = {
  args: {
    story: {
      id: 'merchants-scale',
      title: "The Merchant's Scale",
      teaser: 'Medieval merchant receives a gold coin. Is it real? Archimedes knew how to tell.',
      domain: 'social',
      difficulty: 'beginner',
      duration: 10,
      rating: 4.5,
      playCount: 1520,
      coverImage: 'https://placehold.co/400x200/2a2a3e/ffffff?text=Gold+Coins',
    },
    onClick: () => {},
  },
};

export const Advanced: Story = {
  args: {
    story: {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Can two rational opponents always find a better deal? Game theory says no.',
      domain: 'formal',
      difficulty: 'advanced',
      duration: 15,
      rating: 4.9,
      playCount: 890,
    },
    onClick: () => {},
  },
};

export const Minimal: Story = {
  args: {
    story: {
      id: 'minimal',
      title: 'A Simple Story',
      teaser: 'No rating, no play count — just the basics.',
      domain: 'natural',
      difficulty: 'beginner',
      duration: 8,
    },
    onClick: () => {},
  },
};
