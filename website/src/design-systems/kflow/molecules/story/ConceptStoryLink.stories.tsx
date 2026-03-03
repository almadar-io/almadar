import type { Meta, StoryObj } from '@storybook/react';
import { ConceptStoryLink } from './ConceptStoryLink';

const meta: Meta<typeof ConceptStoryLink> = {
  title: 'KFlow/Molecules/Story/ConceptStoryLink',
  component: ConceptStoryLink,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConceptStoryLink>;

export const Default: Story = {
  args: {
    conceptName: 'Dimensional Analysis',
    story: {
      id: 'mars-bug',
      title: 'The $125 Million Bug',
      teaser: 'How a unit conversion error destroyed a Mars orbiter.',
      domain: 'natural',
      difficulty: 'beginner',
      duration: 12,
      rating: 4.8,
      playCount: 2340,
    },
  },
};

export const FormalDomain: Story = {
  args: {
    conceptName: 'Game Theory',
    story: {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Can two rational opponents always find a better deal?',
      domain: 'formal',
      difficulty: 'advanced',
      duration: 15,
    },
  },
};

export const SocialDomain: Story = {
  args: {
    conceptName: 'Trade Routes',
    story: {
      id: 'silk-road',
      title: 'The Silk Road',
      teaser: 'How ancient trade networks connected civilizations.',
      domain: 'social',
      difficulty: 'intermediate',
      duration: 18,
      rating: 4.6,
      playCount: 1890,
    },
  },
};
