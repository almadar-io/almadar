import type { Meta, StoryObj } from '@storybook/react';
import { JumpBackInCard } from './JumpBackInCard';

const meta: Meta<typeof JumpBackInCard> = {
  title: 'KFlow/Molecules/Story/JumpBackInCard',
  component: JumpBackInCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JumpBackInCard>;

export const Default: Story = {
  args: {
    story: {
      id: 'mars-bug',
      title: 'The $125 Million Bug',
      teaser: 'How a unit conversion error destroyed a Mars orbiter.',
      domain: 'natural',
      difficulty: 'beginner',
      duration: 12,
      currentSection: 3,
      totalSections: 5,
    },
  },
};

export const WithCoverImage: Story = {
  args: {
    story: {
      id: 'silk-road',
      title: 'The Silk Road',
      teaser: 'How ancient trade networks connected civilizations.',
      domain: 'social',
      difficulty: 'intermediate',
      duration: 18,
      coverImage: 'https://placehold.co/400x200/2a2a3e/ffffff?text=Silk+Road',
      currentSection: 1,
      totalSections: 7,
    },
  },
};

export const NearCompletion: Story = {
  args: {
    story: {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Can two rational opponents always find a better deal?',
      domain: 'formal',
      difficulty: 'advanced',
      duration: 15,
      currentSection: 6,
      totalSections: 7,
    },
  },
};
