import type { Meta, StoryObj } from '@storybook/react-vite';
import { LearningGoalDisplay } from './LearningGoalDisplay';

const meta: Meta<typeof LearningGoalDisplay> = {
  title: 'KFlow/Molecules/LearningGoalDisplay',
  component: LearningGoalDisplay,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LearningGoalDisplay>;

export const Default: Story = {
  args: {
    goal: 'Understand the fundamental concepts of machine learning including supervised and unsupervised learning algorithms.',
    layerNumber: 1,
    graphId: 'ml-course-1',
  },
};

export const LongGoal: Story = {
  args: {
    goal: 'By the end of this layer, you should be able to implement basic neural network architectures from scratch, understand backpropagation and gradient descent, apply regularization techniques to prevent overfitting, and evaluate model performance using appropriate metrics.',
    layerNumber: 3,
    graphId: 'deep-learning-1',
  },
};

export const NoGoal: Story = {
  args: {
    goal: undefined,
    layerNumber: 1,
  },
};

export const Saving: Story = {
  args: {
    goal: 'Learn the basics of Python programming.',
    layerNumber: 0,
    graphId: 'python-101',
    isSaving: true,
  },
};

export const Layer0: Story = {
  args: {
    goal: 'Build a strong foundation in programming concepts and computational thinking.',
    layerNumber: 0,
    graphId: 'foundations',
  },
};

export const AdvancedLayer: Story = {
  args: {
    goal: 'Master advanced optimization techniques and apply them to real-world machine learning problems.',
    layerNumber: 5,
    graphId: 'advanced-ml',
  },
};
