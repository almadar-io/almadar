import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConceptDetailTemplate } from './ConceptDetailTemplate';

const meta: Meta<typeof ConceptDetailTemplate> = {
  title: 'KFlow/Templates/ConceptDetailTemplate',
  component: ConceptDetailTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConceptDetailTemplate>;

const sampleLessonSegments = [
  {
    type: 'markdown' as const,
    content: `## Understanding Backpropagation

Backpropagation is the fundamental algorithm used to train neural networks. It calculates the gradient of the loss function with respect to each weight by propagating the error backward through the network.

### The Chain Rule

The chain rule of calculus is essential to understanding backpropagation. It allows us to compute derivatives of composite functions.
`,
  },
  {
    type: 'code' as const,
    content: `def backward(self, grad_output):
    # Compute gradients
    grad_weights = np.dot(self.input.T, grad_output)
    grad_input = np.dot(grad_output, self.weights.T)

    # Update weights
    self.weights -= learning_rate * grad_weights

    return grad_input`,
    language: 'python',
  },
];

const sampleFlashcards = [
  { id: '1', front: 'What is backpropagation?', back: 'An algorithm for calculating gradients by propagating errors backward through a network.' },
  { id: '2', front: 'What mathematical rule is essential to backpropagation?', back: 'The chain rule of calculus.' },
  { id: '3', front: 'What do we update during backpropagation?', back: 'The weights of the neural network.' },
];

export const Default: Story = {
  args: {
    entity: {
      id: 'concept-1',
      name: 'Backpropagation',
      description: 'The fundamental algorithm for training neural networks by computing gradients through the chain rule.',
      layer: 2,
      prerequisites: ['Gradient Descent', 'Chain Rule', 'Neural Network Basics'],
      parents: ['Neural Networks', 'Optimization'],
      learningGoal: 'Understand how backpropagation works and be able to implement it from scratch.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      flashcards: sampleFlashcards,
      progress: 45,
    },
    graphId: 'ml-course-1',
  },
};

export const NoLesson: Story = {
  args: {
    entity: {
      id: 'concept-2',
      name: 'Transformer Architecture',
      description: 'The architecture behind modern language models like GPT and BERT.',
      layer: 4,
      prerequisites: ['Attention Mechanism', 'Embeddings'],
      parents: ['Deep Learning'],
      hasLesson: false,
      progress: 0,
    },
  },
};

export const SeedConcept: Story = {
  args: {
    entity: {
      id: 'concept-3',
      name: 'Mathematics Foundations',
      description: 'Core mathematical concepts needed for machine learning.',
      layer: 0,
      isSeed: true,
      learningGoal: 'Build a strong foundation in linear algebra, calculus, and probability.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      progress: 100,
    },
  },
};

export const WithFlashcardsOnly: Story = {
  args: {
    entity: {
      id: 'concept-4',
      name: 'Activation Functions',
      description: 'Non-linear functions used in neural networks.',
      layer: 1,
      flashcards: [
        { id: '1', front: 'What is ReLU?', back: 'Rectified Linear Unit: f(x) = max(0, x)' },
        { id: '2', front: 'What is Sigmoid?', back: 'f(x) = 1 / (1 + e^(-x))' },
        { id: '3', front: 'What is Tanh?', back: 'Hyperbolic tangent: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))' },
        { id: '4', front: 'Why use activation functions?', back: 'To introduce non-linearity, enabling the network to learn complex patterns.' },
      ],
      hasLesson: false,
      progress: 25,
    },
  },
};

export const FullyCompleted: Story = {
  args: {
    entity: {
      id: 'concept-5',
      name: 'Linear Regression',
      description: 'The simplest form of supervised learning.',
      layer: 1,
      prerequisites: ['Statistics Basics'],
      parents: ['Machine Learning'],
      learningGoal: 'Master linear regression and understand its assumptions.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      flashcards: sampleFlashcards.map((c) => ({ ...c, studied: true })),
      progress: 100,
    },
  },
};

export const NoBackButton: Story = {
  args: {
    entity: {
      id: 'concept-6',
      name: 'Introduction',
      description: 'Welcome to the course.',
      layer: 0,
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
    },
    showBack: false,
  },
};
