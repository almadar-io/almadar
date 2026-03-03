import type { Meta, StoryObj } from '@storybook/react-vite';
import FlashCardsDisplay from './FlashCardsDisplay';
import type { FlashCard } from '../types';

const mockFlashCards: FlashCard[] = [
  { id: 'fc-1', front: 'What is the time complexity of quicksort?', back: 'O(n log n) average case, O(n^2) worst case' },
  { id: 'fc-2', front: 'What is a hash table?', back: 'A data structure that maps keys to values using a hash function for O(1) average lookup.' },
  { id: 'fc-3', front: 'Explain the difference between a stack and a queue.', back: 'Stack: LIFO (Last In, First Out). Queue: FIFO (First In, First Out).' },
  { id: 'fc-4', front: 'What is memoization?', back: 'An optimization technique that stores results of expensive function calls and returns the cached result for the same inputs.' },
  { id: 'fc-5', front: 'What is Big O notation?', back: 'A mathematical notation that describes the upper bound of an algorithm\'s time or space complexity as input size grows.' },
];

const meta: Meta<typeof FlashCardsDisplay> = {
  title: 'KFlow/Organisms/FlashCardsDisplay',
  component: FlashCardsDisplay,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FlashCardsDisplay>;

export const Default: Story = {
  args: {
    flashCards: mockFlashCards,
  },
};

export const WithEditButton: Story = {
  args: {
    flashCards: mockFlashCards,
    onEdit: () => { /* noop */ },
  },
};

export const EditingMode: Story = {
  args: {
    flashCards: mockFlashCards,
    isEditing: true,
    onSaveFlashCards: () => { /* noop */ },
    onCancelEdit: () => { /* noop */ },
  },
};

export const SingleCard: Story = {
  args: {
    flashCards: [mockFlashCards[0]],
  },
};

export const EditingEmptyCards: Story = {
  args: {
    flashCards: [],
    isEditing: true,
    onSaveFlashCards: () => { /* noop */ },
    onCancelEdit: () => { /* noop */ },
  },
};

export const Loading: Story = {
  args: {
    flashCards: mockFlashCards,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    flashCards: [],
  },
};

export const ErrorState: Story = {
  args: {
    flashCards: mockFlashCards,
    error: new Error('Failed to load flash cards'),
  },
};
