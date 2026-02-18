/**
 * LessonBoard Organism
 *
 * Lesson content display with sidebar navigation, reading progress,
 * and prev/next navigation. Extracted from LessonTemplate for flattener compliance.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle } from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Card,
  useEventBus,
} from '@almadar/ui';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import type { Segment } from '../utils/parseLessonSegments';

export interface LessonEntity {
  id: string;
  title: string;
  content: string;
  segments?: Segment[];
  duration?: number;
  isCompleted?: boolean;
  courseTitle?: string;
  courseProgress?: number;
}

export interface SidebarItem {
  id: string;
  title: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface LessonBoardProps {
  entity: LessonEntity;
  sidebarItems?: SidebarItem[];
  hasPrevious?: boolean;
  hasNext?: boolean;
  readingProgress?: number;
  completeEvent?: string;
  nextEvent?: string;
  prevEvent?: string;
  toggleSidebarEvent?: string;
  selectLessonEvent?: string;
  className?: string;
}

export function LessonBoard({
  entity,
  sidebarItems = [],
  hasPrevious = false,
  hasNext = false,
  readingProgress = 0,
  completeEvent,
  nextEvent,
  prevEvent,
  toggleSidebarEvent,
  selectLessonEvent,
  className = '',
}: LessonBoardProps): JSX.Element {
  const { emit } = useEventBus();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleComplete = () => {
    if (completeEvent) emit(`UI:${completeEvent}`, { lessonId: entity.id });
  };

  const handleNext = () => {
    if (nextEvent) emit(`UI:${nextEvent}`, { currentLessonId: entity.id });
  };

  const handlePrev = () => {
    if (prevEvent) emit(`UI:${prevEvent}`, { currentLessonId: entity.id });
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (toggleSidebarEvent) emit(`UI:${toggleSidebarEvent}`, { open: !sidebarOpen });
  };

  const handleSelectLesson = (lessonId: string) => {
    if (selectLessonEvent) emit(`UI:${selectLessonEvent}`, { lessonId });
    setSidebarOpen(false);
  };

  return (
    <Box className={`min-h-screen bg-gray-50 ${className}`}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <HStack justify="between" align="center" className="px-4 h-14">
          <HStack gap="sm" align="center">
            <button
              onClick={handleToggleSidebar}
              className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded"
            >
              <Menu size={20} />
            </button>
            <VStack gap="none" className="min-w-0">
              {entity.courseTitle && (
                <span className="text-xs text-[var(--color-muted-foreground)] truncate">
                  {entity.courseTitle}
                </span>
              )}
              <span className="font-medium text-[var(--color-foreground)] truncate">
                {entity.title}
              </span>
            </VStack>
          </HStack>

          <HStack gap="sm" align="center">
            {entity.isCompleted && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded flex items-center gap-1">
                <CheckCircle size={12} />
                Completed
              </span>
            )}
            {entity.courseProgress !== undefined && (
              <HStack gap="xs" align="center" className="w-32">
                <Box className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <Box
                    className="h-full bg-indigo-500"
                    style={{ width: `${entity.courseProgress}%` }}
                  />
                </Box>
                <span className="text-xs text-[var(--color-muted-foreground)]">{entity.courseProgress}%</span>
              </HStack>
            )}
          </HStack>
        </HStack>

        <Box className="h-1 bg-gray-100">
          <Box
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </Box>
      </header>

      {sidebarOpen && (
        <>
          <Box
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto">
            <HStack justify="between" align="center" className="p-4 border-b border-gray-200">
              <span className="font-semibold text-[var(--color-foreground)]">Course Content</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </HStack>
            <VStack gap="none" className="p-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectLesson(item.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    item.isCurrent
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : item.isCompleted
                      ? 'text-[var(--color-muted-foreground)]'
                      : 'text-[var(--color-foreground)] hover:bg-gray-50'
                  }`}
                >
                  <HStack gap="sm" align="center">
                    {item.isCompleted && <CheckCircle size={14} className="text-green-500" />}
                    <span className="truncate">{item.title}</span>
                  </HStack>
                </button>
              ))}
            </VStack>
          </aside>
        </>
      )}

      <main className="pt-20 pb-24">
        <article className="max-w-3xl mx-auto px-4">
          <VStack gap="lg">
            <VStack gap="sm">
              <h1 className="text-3xl font-bold text-[var(--color-foreground)]">{entity.title}</h1>
              {entity.duration && (
                <span className="text-sm text-[var(--color-muted-foreground)]">{entity.duration} min read</span>
              )}
            </VStack>

            {entity.segments && entity.segments.length > 0 ? (
              <SegmentRenderer segments={entity.segments} />
            ) : (
              <Card>
                <div
                  className="prose prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{ __html: entity.content }}
                />
              </Card>
            )}

            {!entity.isCompleted && (
              <Box className="text-center py-8">
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
                >
                  <CheckCircle size={20} />
                  Mark as Complete
                </button>
              </Box>
            )}
          </VStack>
        </article>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <HStack justify="between" align="center" className="max-w-3xl mx-auto px-4 py-3">
          <button
            onClick={handlePrev}
            disabled={!hasPrevious}
            className="px-4 py-2 text-sm font-medium text-[var(--color-foreground)] bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-sm text-[var(--color-muted-foreground)]">
            {entity.isCompleted ? 'Lesson completed!' : 'Keep learning...'}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </HStack>
      </footer>
    </Box>
  );
}

LessonBoard.displayName = 'LessonBoard';

export default LessonBoard;
