import type { Meta, StoryObj } from '@storybook/react';
import { BookOpen, Star, Zap } from 'lucide-react';
import { ConceptCard } from './ConceptCard';

const meta: Meta<typeof ConceptCard> = {
  title: 'KFlow/Organisms/ConceptCard',
  component: ConceptCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConceptCard>;

export const Default: Story = {
  args: {
    entity: {
      id: 'concept-1',
      name: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning algorithms and their applications.',
    },
  },
};

export const WithLesson: Story = {
  args: {
    entity: {
      id: 'concept-2',
      name: 'Neural Networks Basics',
      description: 'Understanding the architecture and training of neural networks.',
      hasLesson: true,
    },
  },
};

export const CurrentConcept: Story = {
  args: {
    entity: {
      id: 'concept-3',
      name: 'Deep Learning',
      description: 'Advanced techniques in deep neural networks.',
      isCurrent: true,
      hasLesson: true,
    },
  },
};

export const CompletedConcept: Story = {
  args: {
    entity: {
      id: 'concept-4',
      name: 'Linear Algebra Review',
      description: 'A review of essential linear algebra concepts.',
      isCompleted: true,
    },
  },
};

export const WithProgress: Story = {
  args: {
    entity: {
      id: 'concept-5',
      name: 'Convolutional Networks',
      description: 'Image processing with CNNs.',
      progress: 65,
      hasLesson: true,
    },
  },
};

export const WithPrerequisites: Story = {
  args: {
    entity: {
      id: 'concept-6',
      name: 'Recurrent Neural Networks',
      description: 'Sequential data processing with RNNs and LSTMs.',
      prerequisites: ['Neural Networks Basics', 'Backpropagation'],
      parents: ['Deep Learning'],
      hasLesson: true,
    },
  },
};

export const WithOperations: Story = {
  args: {
    entity: {
      id: 'concept-7',
      name: 'Transformers',
      description: 'Attention mechanisms and transformer architecture.',
      hasLesson: true,
    },
    operations: [
      { label: 'Start Lesson', action: 'start', variant: 'primary' },
      { label: 'Practice', action: 'practice', variant: 'secondary' },
    ],
  },
};

export const WithChildren: Story = {
  args: {
    entity: {
      id: 'concept-8',
      name: 'Natural Language Processing',
      description: 'Processing and understanding human language.',
      hasLesson: true,
      childConcepts: [
        {
          id: 'child-1',
          name: 'Tokenization',
          description: 'Breaking text into tokens.',
          hasLesson: true,
        },
        {
          id: 'child-2',
          name: 'Word Embeddings',
          description: 'Vector representations of words.',
          hasLesson: false,
        },
        {
          id: 'child-3',
          name: 'Sentiment Analysis',
          description: 'Determining sentiment from text.',
          isCompleted: true,
        },
      ],
    },
    expanded: true,
  },
};

export const WithIcon: Story = {
  args: {
    entity: {
      id: 'concept-9',
      name: 'Reinforcement Learning',
      description: 'Learning through interaction with environments.',
      hasLesson: true,
    },
    icon: Zap,
  },
};

export const HiddenLessonBadge: Story = {
  args: {
    entity: {
      id: 'concept-10',
      name: 'Q-Learning',
      description: 'Value-based reinforcement learning algorithm.',
      hasLesson: true,
    },
    hideLessonBadge: true,
  },
};
