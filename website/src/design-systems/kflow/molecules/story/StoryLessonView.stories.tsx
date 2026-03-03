import type { Meta, StoryObj } from '@storybook/react';
import { StoryLessonView } from './StoryLessonView';

const meta: Meta<typeof StoryLessonView> = {
  title: 'KFlow/Molecules/Story/StoryLessonView',
  component: StoryLessonView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryLessonView>;

export const Default: Story = {
  args: {
    principle: 'Dimensional Analysis — Always Track Your Units',
    explanation: 'Every physical quantity has **dimensions** (length, mass, time, force). When you combine quantities in equations, the dimensions must be consistent on both sides.\n\n**The rule is simple**: if the units don\'t match, the answer is wrong — no matter how good the math is.\n\nDimensional analysis catches errors *before* they become disasters. It\'s the cheapest quality check in engineering.',
    pattern: '**Before combining values from different sources:**\n1. Identify the units of each value\n2. Convert all values to a common unit system\n3. Verify dimensional consistency\n4. Document the unit convention',
    tryItQuestion: 'A European car spec lists fuel efficiency as 5.9 L/100km. An American rental site shows 40 MPG. Which is more efficient?',
    tryItOptions: [
      'The European car (5.9 L/100km)',
      'The American car (40 MPG)',
      'They are approximately equal',
      'Cannot compare without conversion',
    ],
    tryItCorrectIndex: 2,
    onTryItAnswer: () => {},
  },
};

export const Answered: Story = {
  args: {
    ...Default.args,
  },
};
