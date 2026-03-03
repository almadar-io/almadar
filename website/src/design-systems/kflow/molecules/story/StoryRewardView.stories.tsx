import type { Meta, StoryObj } from '@storybook/react';
import { StoryRewardView } from './StoryRewardView';

const meta: Meta<typeof StoryRewardView> = {
  title: 'KFlow/Molecules/Story/StoryRewardView',
  component: StoryRewardView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryRewardView>;

export const Default: Story = {
  args: {
    resolution: 'You just proved you could have caught the bug that destroyed the Mars Climate Orbiter. The fix was simple — a unit conversion check that any engineer could implement. NASA now mandates dimensional analysis reviews on every mission. The $125 million lesson changed spaceflight forever.',
    learningPoints: [
      'Every physical quantity has dimensions that must be tracked',
      'Unit mismatches are the most common source of engineering disasters',
      'Dimensional analysis is a cheap, reliable error-catching technique',
      'Always document and verify unit conventions at system boundaries',
    ],
    gameResult: {
      score: 100,
      time: 45,
      attempts: 2,
    },
    onShare: () => {},
    onExploreMore: () => {},
  },
};

export const WithoutGameResult: Story = {
  args: {
    resolution: 'The story concludes without a game result.',
    learningPoints: [
      'First learning point',
      'Second learning point',
    ],
    onExploreMore: () => {},
  },
};

export const MinimalActions: Story = {
  args: {
    resolution: 'A minimal reward view with no action buttons.',
    learningPoints: [
      'You learned something valuable today.',
    ],
  },
};

export const WithRabbitHole: Story = {
  args: {
    resolution: 'You proved dimensional analysis catches unit errors before they cost millions.',
    learningPoints: [
      'Every physical quantity has dimensions that must be tracked',
      'Dimensional analysis is a cheap, reliable error-catching technique',
    ],
    gameResult: { score: 100, time: 45, attempts: 2 },
    nextStory: {
      id: 'unit-testing',
      title: 'The Test That Saved the Mission',
      teaser: 'Why NASA now tests every calculation twice.',
      domain: 'natural',
      difficulty: 'intermediate',
      duration: 14,
      rating: 4.7,
    },
    bridges: [
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
    ],
    primarySubjectId: 'physics',
    primarySubjectName: 'Physics',
    onShare: () => {},
    onExploreMore: () => {},
  },
};

export const RabbitHoleGenerateCTA: Story = {
  args: {
    resolution: 'Story complete, but no next story in the series.',
    learningPoints: ['Learned about trade networks'],
    primarySubjectId: 'history',
    primarySubjectName: 'History',
    onExploreMore: () => {},
  },
};
