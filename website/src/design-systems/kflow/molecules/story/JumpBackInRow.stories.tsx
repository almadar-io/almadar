import type { Meta, StoryObj } from '@storybook/react';
import { JumpBackInRow } from './JumpBackInRow';
import type { JumpBackInStory } from './JumpBackInCard';

const meta: Meta<typeof JumpBackInRow> = {
  title: 'KFlow/Molecules/Story/JumpBackInRow',
  component: JumpBackInRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JumpBackInRow>;

const inProgressStories: JumpBackInStory[] = [
  {
    id: 'mars-bug',
    title: 'The $125 Million Bug',
    teaser: 'How a unit conversion error destroyed a Mars orbiter.',
    domain: 'natural',
    difficulty: 'beginner',
    duration: 12,
    currentSection: 3,
    totalSections: 5,
  },
  {
    id: 'silk-road',
    title: 'The Silk Road',
    teaser: 'How ancient trade networks connected civilizations.',
    domain: 'social',
    difficulty: 'intermediate',
    duration: 18,
    currentSection: 1,
    totalSections: 7,
  },
  {
    id: 'prisoners-choice',
    title: "The Prisoner's Choice",
    teaser: 'Can two rational opponents always find a better deal?',
    domain: 'formal',
    difficulty: 'advanced',
    duration: 15,
    currentSection: 6,
    totalSections: 7,
  },
];

export const Default: Story = {
  args: {
    stories: inProgressStories,
  },
};

export const SingleStory: Story = {
  args: {
    stories: [inProgressStories[0]],
  },
};

export const EmptyState: Story = {
  args: {
    stories: [],
  },
};

export const CustomTitle: Story = {
  args: {
    stories: inProgressStories.slice(0, 2),
    title: 'Continue Learning',
  },
};
