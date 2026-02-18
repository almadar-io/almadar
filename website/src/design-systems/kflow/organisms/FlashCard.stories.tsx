import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlashCard } from './FlashCard';

const meta: Meta<typeof FlashCard> = {
  title: 'KFlow/Organisms/FlashCard',
  component: FlashCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FlashCard>;

export const Default: Story = {
  args: {
    entity: {
      id: 'card-1',
      front: 'What is the capital of France?',
      back: 'Paris',
    },
  },
};

export const Flipped: Story = {
  args: {
    entity: {
      id: 'card-2',
      front: 'What is 2 + 2?',
      back: '4',
    },
    flipped: true,
  },
};

export const Studied: Story = {
  args: {
    entity: {
      id: 'card-3',
      front: 'What is the chemical symbol for water?',
      back: 'H₂O',
      studied: true,
    },
    flipped: true,
  },
};

export const WithProgress: Story = {
  args: {
    entity: {
      id: 'card-4',
      front: 'What is the speed of light?',
      back: '299,792,458 m/s',
    },
    currentCard: 5,
    totalCards: 10,
  },
};

export const NoActions: Story = {
  args: {
    entity: {
      id: 'card-5',
      front: 'What year did World War II end?',
      back: '1945',
    },
    showActions: false,
  },
};

export const NoNavigation: Story = {
  args: {
    entity: {
      id: 'card-6',
      front: 'What is the largest planet in our solar system?',
      back: 'Jupiter',
    },
    showNavigation: false,
  },
};

export const MinimalMode: Story = {
  args: {
    entity: {
      id: 'card-7',
      front: 'What is the formula for the area of a circle?',
      back: 'πr²',
    },
    showActions: false,
    showNavigation: false,
  },
};

export const LongContent: Story = {
  args: {
    entity: {
      id: 'card-8',
      front: 'Explain the concept of object-oriented programming and its main principles.',
      back: 'OOP is a programming paradigm based on objects containing data and methods. Main principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
    },
    currentCard: 8,
    totalCards: 20,
  },
};
