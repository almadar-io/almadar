import type { Meta, StoryObj } from '@storybook/react';
import { StoryRabbitHole } from './StoryRabbitHole';
import type { StorySummary, StoryBridge } from '../../types/knowledge';

const meta: Meta<typeof StoryRabbitHole> = {
  title: 'KFlow/Molecules/Story/StoryRabbitHole',
  component: StoryRabbitHole,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryRabbitHole>;

const nextStory: StorySummary = {
  id: 'unit-testing',
  title: 'The Test That Saved the Mission',
  teaser: 'Why NASA now tests every calculation twice.',
  domain: 'natural',
  difficulty: 'intermediate',
  duration: 14,
  rating: 4.7,
  playCount: 1890,
};

const bridges: StoryBridge[] = [
  {
    story: {
      id: 'prisoners-choice',
      title: "The Prisoner's Choice",
      teaser: 'Can two rational opponents always find a better deal?',
      domain: 'formal',
      difficulty: 'advanced',
      duration: 15,
    },
    connectionLabel: 'Decision Theory',
  },
  {
    story: {
      id: 'silk-road',
      title: 'The Silk Road',
      teaser: 'How ancient trade networks connected civilizations.',
      domain: 'social',
      difficulty: 'intermediate',
      duration: 18,
    },
    connectionLabel: 'Network Effects',
  },
];

export const WithNextStory: Story = {
  args: {
    nextStory,
    bridges,
    primarySubjectId: 'physics',
    primarySubjectName: 'Physics',
  },
};

export const WithoutNextStory: Story = {
  args: {
    bridges,
    primarySubjectId: 'physics',
    primarySubjectName: 'Physics',
  },
};

export const NoBridges: Story = {
  args: {
    nextStory,
    primarySubjectId: 'physics',
    primarySubjectName: 'Physics',
  },
};

export const Minimal: Story = {
  args: {
    primarySubjectId: 'physics',
    primarySubjectName: 'Physics',
  },
};
