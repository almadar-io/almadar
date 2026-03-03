import type { Meta, StoryObj } from '@storybook/react-vite';
import { LessonBoard } from './LessonBoard';
import type { LessonEntity, SidebarItem } from './LessonBoard';
import type { Segment } from '../utils/parseLessonSegments';

const mockSegments: Segment[] = [
  { type: 'markdown', content: '## What is Binary Search?\n\nBinary search is a search algorithm that finds the position of a target value within a sorted array. It compares the target to the middle element and eliminates half the remaining elements each step.' },
  { type: 'code', language: 'typescript', content: 'function binarySearch(arr: number[], target: number): number {\n  let low = 0;\n  let high = arr.length - 1;\n\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}' },
  { type: 'activate', question: 'Try tracing through the algorithm with the array [1, 3, 5, 7, 9, 11] and target 7.' },
  { type: 'markdown', content: '### Time Complexity\n\nBinary search runs in **O(log n)** time because it halves the search space with each comparison. This makes it significantly faster than linear search for large datasets.' },
  { type: 'quiz', question: 'What is the worst-case time complexity of binary search?', answer: 'O(log n) - even in the worst case, binary search only needs log2(n) comparisons.' },
  { type: 'reflect', prompt: 'Consider a scenario where you have a phone book with 1 million entries. How many comparisons would binary search need to find a name?' },
];

const mockEntity: LessonEntity = {
  id: 'lesson-binary-search',
  title: 'Binary Search Algorithm',
  content: '<p>Binary search is an efficient algorithm for finding items in sorted arrays.</p>',
  segments: mockSegments,
  duration: 15,
  isCompleted: false,
  courseTitle: 'Algorithms & Data Structures',
  courseProgress: 35,
};

const mockSidebarItems: SidebarItem[] = [
  { id: 'lesson-1', title: 'Introduction to Algorithms', isCompleted: true },
  { id: 'lesson-2', title: 'Linear Search', isCompleted: true },
  { id: 'lesson-binary-search', title: 'Binary Search Algorithm', isCurrent: true },
  { id: 'lesson-4', title: 'Sorting Algorithms Overview' },
  { id: 'lesson-5', title: 'Bubble Sort' },
  { id: 'lesson-6', title: 'Merge Sort' },
  { id: 'lesson-7', title: 'Quick Sort' },
];

const meta: Meta<typeof LessonBoard> = {
  title: 'KFlow/Organisms/LessonBoard',
  component: LessonBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LessonBoard>;

export const Default: Story = {
  args: {
    entity: mockEntity,
    sidebarItems: mockSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 40,
    completeEvent: 'COMPLETE_LESSON',
    nextEvent: 'NEXT_LESSON',
    prevEvent: 'PREV_LESSON',
    toggleSidebarEvent: 'TOGGLE_SIDEBAR',
    selectLessonEvent: 'SELECT_LESSON',
  },
};

export const CompletedLesson: Story = {
  args: {
    entity: {
      ...mockEntity,
      isCompleted: true,
    },
    sidebarItems: mockSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 100,
  },
};

export const FirstLesson: Story = {
  args: {
    entity: mockEntity,
    sidebarItems: mockSidebarItems,
    hasPrevious: false,
    hasNext: true,
    readingProgress: 0,
  },
};

export const LastLesson: Story = {
  args: {
    entity: mockEntity,
    sidebarItems: mockSidebarItems,
    hasPrevious: true,
    hasNext: false,
    readingProgress: 80,
  },
};

export const NoSidebar: Story = {
  args: {
    entity: mockEntity,
    sidebarItems: [],
    readingProgress: 25,
  },
};

export const HtmlContentOnly: Story = {
  args: {
    entity: {
      ...mockEntity,
      segments: undefined,
      content: '<h2>HTML Lesson</h2><p>This lesson uses raw HTML content instead of parsed segments.</p><ul><li>Point one</li><li>Point two</li><li>Point three</li></ul>',
    },
    readingProgress: 50,
  },
};

export const NoCourseInfo: Story = {
  args: {
    entity: {
      ...mockEntity,
      courseTitle: undefined,
      courseProgress: undefined,
    },
    readingProgress: 60,
  },
};

export const Loading: Story = {
  args: {
    entity: mockEntity,
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    entity: mockEntity,
    error: new Error('Failed to load lesson content'),
  },
};

export const Empty: Story = {
  args: {
    entity: {
      id: 'empty-lesson',
      title: 'Untitled Lesson',
      content: '',
    },
    readingProgress: 0,
  },
};

export const WithBilingualSupport: Story = {
  args: {
    entity: {
      ...mockEntity,
      availableLanguages: ['en', 'ar', 'sl'],
      selectedLanguage: 'en',
      translatedContent: '<h2>خوارزمية البحث الثنائي</h2><p>البحث الثنائي هو خوارزمية بحث فعالة تجد موضع قيمة مستهدفة داخل مصفوفة مرتبة.</p>',
      translationStatus: 'ready' as const,
    },
    sidebarItems: mockSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 40,
    completeEvent: 'COMPLETE_LESSON',
    nextEvent: 'NEXT_LESSON',
    prevEvent: 'PREV_LESSON',
    languageChangeEvent: 'LANGUAGE_CHANGE',
    regenerateTranslationEvent: 'REGENERATE_TRANSLATION',
    bilingualToggleEvent: 'BILINGUAL_TOGGLE',
  },
};

export const BilingualTranslating: Story = {
  args: {
    entity: {
      ...mockEntity,
      availableLanguages: ['en', 'ar'],
      selectedLanguage: 'en',
      translationStatus: 'loading' as const,
    },
    sidebarItems: mockSidebarItems,
    readingProgress: 40,
    languageChangeEvent: 'LANGUAGE_CHANGE',
    bilingualToggleEvent: 'BILINGUAL_TOGGLE',
  },
};

export const BilingualError: Story = {
  args: {
    entity: {
      ...mockEntity,
      availableLanguages: ['en', 'ar'],
      selectedLanguage: 'en',
      translationStatus: 'error' as const,
    },
    sidebarItems: mockSidebarItems,
    readingProgress: 40,
    languageChangeEvent: 'LANGUAGE_CHANGE',
    regenerateTranslationEvent: 'REGENERATE_TRANSLATION',
    bilingualToggleEvent: 'BILINGUAL_TOGGLE',
  },
};

export const WithFlashcards: Story = {
  args: {
    entity: {
      ...mockEntity,
      flashcards: [
        { id: 'fc-1', front: 'What is the time complexity of binary search?', back: 'O(log n)' },
        { id: 'fc-2', front: 'What prerequisite does binary search require?', back: 'The array must be sorted.' },
        { id: 'fc-3', front: 'How many comparisons for 1 million elements?', back: 'About 20 (log2 of 1,000,000).' },
      ],
    },
    sidebarItems: mockSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 60,
    completeEvent: 'COMPLETE_LESSON',
    nextEvent: 'NEXT_LESSON',
    prevEvent: 'PREV_LESSON',
  },
};
