import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlashCardStack } from './FlashCardStack';

const meta: Meta<typeof FlashCardStack> = {
  title: 'KFlow/Organisms/FlashCardStack',
  component: FlashCardStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FlashCardStack>;

const sampleCards = [
  { id: '1', front: 'What is the capital of France?', back: 'Paris' },
  { id: '2', front: 'What is 2 + 2?', back: '4' },
  { id: '3', front: 'What is H₂O?', back: 'Water' },
  { id: '4', front: 'What planet is known as the Red Planet?', back: 'Mars' },
  { id: '5', front: 'Who wrote Romeo and Juliet?', back: 'William Shakespeare' },
];

export const Default: Story = {
  args: {
    cards: sampleCards,
  },
};

export const Empty: Story = {
  args: {
    cards: [],
  },
};

export const SingleCard: Story = {
  args: {
    cards: [{ id: '1', front: 'Only one card', back: 'Just this one!' }],
  },
};

export const PartiallyStudied: Story = {
  args: {
    cards: [
      { id: '1', front: 'Studied card 1', back: 'Answer 1', studied: true },
      { id: '2', front: 'Studied card 2', back: 'Answer 2', studied: true },
      { id: '3', front: 'Not studied yet', back: 'Answer 3' },
      { id: '4', front: 'Also not studied', back: 'Answer 4' },
      { id: '5', front: 'Need to study this', back: 'Answer 5' },
    ],
    currentIndex: 2,
  },
};

export const AllStudied: Story = {
  args: {
    cards: sampleCards.map((card) => ({ ...card, studied: true })),
  },
};

export const NoShuffle: Story = {
  args: {
    cards: sampleCards,
    showShuffle: false,
  },
};

export const NoSummary: Story = {
  args: {
    cards: sampleCards.map((card) => ({ ...card, studied: true })),
    showSummary: false,
  },
};

export const ManyCards: Story = {
  args: {
    cards: Array.from({ length: 20 }, (_, i) => ({
      id: `card-${i + 1}`,
      front: `Question ${i + 1}`,
      back: `Answer ${i + 1}`,
      studied: i < 7,
    })),
    currentIndex: 7,
  },
};

export const MathCards: Story = {
  args: {
    cards: [
      { id: '1', front: 'What is the derivative of x²?', back: '2x' },
      { id: '2', front: 'What is ∫x dx?', back: 'x²/2 + C' },
      { id: '3', front: 'What is sin²θ + cos²θ?', back: '1' },
      { id: '4', front: 'What is the quadratic formula?', back: 'x = (-b ± √(b²-4ac)) / 2a' },
      { id: '5', front: 'What is e^(iπ) + 1?', back: '0 (Euler\'s identity)' },
    ],
  },
};
