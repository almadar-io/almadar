import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConceptDetailBoard } from './ConceptDetailBoard';
import type { ConceptEntity } from './ConceptDetailBoard';
import type { Segment } from '../utils/parseLessonSegments';

const mockSegments: Segment[] = [
  { type: 'markdown', content: '## Introduction to Binary Search\n\nBinary search is an efficient algorithm for finding a target value within a sorted array.' },
  { type: 'code', language: 'python', content: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1' },
  { type: 'quiz', question: 'What is the time complexity of binary search?', answer: 'O(log n)' },
  { type: 'reflect', prompt: 'When would you choose binary search over linear search?' },
];

const mockFlashcards = [
  { id: 'fc-1', front: 'What is the time complexity of binary search?', back: 'O(log n)', studied: false },
  { id: 'fc-2', front: 'What prerequisite does binary search require?', back: 'The array must be sorted.', studied: false },
  { id: 'fc-3', front: 'What happens when the target is not found?', back: 'The algorithm returns -1 or indicates the element is not present.', studied: true },
];

const mockEntity: ConceptEntity = {
  id: 'concept-binary-search',
  name: 'Binary Search',
  description: 'An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
  layer: 2,
  isSeed: false,
  prerequisites: ['Arrays', 'Sorting Algorithms', 'Recursion'],
  parents: ['Search Algorithms'],
  learningGoal: 'Understand and implement binary search, analyze its time complexity, and recognize when to apply it.',
  hasLesson: true,
  lessonSegments: mockSegments,
  flashcards: mockFlashcards,
  progress: 45,
};

const meta: Meta<typeof ConceptDetailBoard> = {
  title: 'KFlow/Organisms/ConceptDetailBoard',
  component: ConceptDetailBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConceptDetailBoard>;

export const Default: Story = {
  args: {
    entity: mockEntity,
    graphId: 'graph-cs-101',
    showBack: true,
    backEvent: 'BACK_TO_GRAPH',
    startLessonEvent: 'START_LESSON',
    startPracticeEvent: 'START_PRACTICE',
    navigatePrerequisiteEvent: 'NAVIGATE_PREREQUISITE',
    generateLessonEvent: 'GENERATE_LESSON',
  },
};

export const NoLesson: Story = {
  args: {
    entity: {
      ...mockEntity,
      hasLesson: false,
      lessonSegments: undefined,
    },
    graphId: 'graph-cs-101',
    generateLessonEvent: 'GENERATE_LESSON',
  },
};

export const NoPracticeCards: Story = {
  args: {
    entity: {
      ...mockEntity,
      flashcards: [],
    },
    graphId: 'graph-cs-101',
  },
};

export const SeedConcept: Story = {
  args: {
    entity: {
      ...mockEntity,
      isSeed: true,
      prerequisites: [],
      layer: 0,
    },
    graphId: 'graph-cs-101',
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockEntity,
    showBack: false,
  },
};

export const MinimalConcept: Story = {
  args: {
    entity: {
      id: 'concept-minimal',
      name: 'Introduction',
      description: 'A basic introductory concept.',
    },
  },
};

export const FullProgress: Story = {
  args: {
    entity: {
      ...mockEntity,
      progress: 100,
    },
    graphId: 'graph-cs-101',
  },
};

export const WithRelatedStories: Story = {
  args: {
    entity: {
      ...mockEntity,
      relatedStories: [
        {
          id: 'story-binary-search',
          title: 'The Librarian Who Searched in Halves',
          teaser: 'A story about how an ancient librarian discovered binary search.',
          domain: 'tech',
          difficulty: 'beginner',
          duration: 8,
          coverImage: 'https://placehold.co/400x200/4f46e5/ffffff?text=Binary+Search',
        },
        {
          id: 'story-sorting-race',
          title: 'The Great Sorting Race',
          teaser: 'Which sorting algorithm will win the race?',
          domain: 'tech',
          difficulty: 'intermediate',
          duration: 12,
        },
      ],
    },
    graphId: 'graph-cs-101',
    showBack: true,
    backEvent: 'BACK_TO_GRAPH',
    startLessonEvent: 'START_LESSON',
    startPracticeEvent: 'START_PRACTICE',
    navigatePrerequisiteEvent: 'NAVIGATE_PREREQUISITE',
  },
};

export const Empty: Story = {
  args: {
    entity: {
      id: 'empty-concept',
      name: 'Empty Concept',
    },
  },
};
