import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Star } from 'lucide-react';
import { ConceptCard } from './ConceptCard';
import type { ConceptEntity } from './ConceptCard';

const mockConcept: ConceptEntity = {
  id: 'concept-1',
  name: 'Binary Search Trees',
  description: 'A tree data structure where each node has at most two children, with left children smaller and right children larger.',
  layer: 2,
  prerequisites: ['Arrays', 'Recursion'],
  parents: ['Data Structures'],
  progress: 65,
  hasLesson: true,
  isCompleted: false,
  isCurrent: false,
};

const mockConceptWithChildren: ConceptEntity = {
  ...mockConcept,
  id: 'concept-parent',
  name: 'Tree Data Structures',
  childConcepts: [
    {
      id: 'child-1',
      name: 'Binary Trees',
      description: 'Basic tree with at most two children per node.',
      hasLesson: true,
      isCompleted: true,
    },
    {
      id: 'child-2',
      name: 'AVL Trees',
      description: 'Self-balancing binary search tree.',
      hasLesson: false,
      progress: 30,
    },
    {
      id: 'child-3',
      name: 'Red-Black Trees',
      description: 'Self-balancing BST with color properties.',
      isCurrent: true,
    },
  ],
};

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
    entity: mockConcept,
  },
};

export const CurrentConcept: Story = {
  args: {
    entity: {
      ...mockConcept,
      isCurrent: true,
    },
  },
};

export const CompletedConcept: Story = {
  args: {
    entity: {
      ...mockConcept,
      isCompleted: true,
      progress: 100,
    },
  },
};

export const Highlighted: Story = {
  args: {
    entity: {
      ...mockConcept,
      hasLesson: true,
    },
    highlighted: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    entity: mockConcept,
    icon: BookOpen,
  },
};

export const WithOperations: Story = {
  args: {
    entity: mockConcept,
    operations: [
      { label: 'Start Lesson', icon: BookOpen, action: 'start-lesson', variant: 'primary' as const },
      { label: 'Favorite', icon: Star, action: 'favorite', variant: 'secondary' as const },
    ],
  },
};

export const WithChildren: Story = {
  args: {
    entity: mockConceptWithChildren,
    expanded: true,
  },
};

export const CollapsedChildren: Story = {
  args: {
    entity: mockConceptWithChildren,
    expanded: false,
  },
};

export const NoLessonBadge: Story = {
  args: {
    entity: mockConcept,
    hideLessonBadge: true,
  },
};

export const MinimalConcept: Story = {
  args: {
    entity: {
      id: 'minimal',
      name: 'Simple Concept',
    },
  },
};

export const MinimalEntity: Story = {
  args: {
    entity: { id: 'quick', name: 'Quick Concept Name' },
  },
};

export const Empty: Story = {
  args: {
    entity: undefined,
  },
};
