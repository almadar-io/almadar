/**
 * LessonTemplate - Template for displaying lesson content with navigation
 *
 * Almadar Entity Binding:
 * - Data flows through `entity` prop from Almadar state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:LESSON_COMPLETE - When lesson is marked complete
 * - UI:LESSON_NEXT - When navigating to next lesson
 * - UI:LESSON_PREV - When navigating to previous lesson
 * - UI:TOGGLE_SIDEBAR - When sidebar is toggled
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle } from 'lucide-react';
import { Box } from '../../../components/atoms/Box';
import { VStack } from '../../../components/atoms/Stack';
import { HStack } from '../../../components/atoms/Stack';
import { Card } from '../../../components/molecules/Card';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import { useEventBus } from '../../../hooks/useEventBus';
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

export interface LessonTemplateProps {
  /** Lesson entity data */
  entity: LessonEntity;
  /** Sidebar items (other lessons) */
  sidebarItems?: SidebarItem[];
  /** Has previous lesson */
  hasPrevious?: boolean;
  /** Has next lesson */
  hasNext?: boolean;
  /** Reading progress (0-100) */
  readingProgress?: number;
  /** Additional CSS classes */
  className?: string;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Custom footer content */
  footerContent?: React.ReactNode;
}

export const LessonTemplate: React.FC<LessonTemplateProps> = ({
  entity,
  sidebarItems = [],
  hasPrevious = false,
  hasNext = false,
  readingProgress = 0,
  className = '',
  headerContent,
  footerContent,
}) => {
  const { emit } = useEventBus();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleComplete = () => {
    emit('UI:LESSON_COMPLETE', { lessonId: entity.id });
  };

  const handleNext = () => {
    emit('UI:LESSON_NEXT', { currentLessonId: entity.id });
  };

  const handlePrev = () => {
    emit('UI:LESSON_PREV', { currentLessonId: entity.id });
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    emit('UI:TOGGLE_SIDEBAR', { open: !sidebarOpen });
  };

  const handleSelectLesson = (lessonId: string) => {
    emit('UI:SELECT_LESSON', { lessonId });
    setSidebarOpen(false);
  };

  return (
    <Box className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <HStack justify="between" align="center" className="px-4 h-14">
          <HStack gap="sm" align="center">
            <button
              onClick={handleToggleSidebar}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              <Menu size={20} />
            </button>
            <VStack gap="none" className="min-w-0">
              {entity.courseTitle && (
                <span className="text-xs text-gray-500 truncate">
                  {entity.courseTitle}
                </span>
              )}
              <span className="font-medium text-gray-900 truncate">
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
                <span className="text-xs text-gray-500">{entity.courseProgress}%</span>
              </HStack>
            )}
            {headerContent}
          </HStack>
        </HStack>

        {/* Reading progress */}
        <Box className="h-1 bg-gray-100">
          <Box
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </Box>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <Box
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto">
            <HStack justify="between" align="center" className="p-4 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Course Content</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
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
                      ? 'text-gray-500'
                      : 'text-gray-700 hover:bg-gray-50'
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

      {/* Main content */}
      <main className="pt-20 pb-24">
        <article className="max-w-3xl mx-auto px-4">
          <VStack gap="lg">
            <VStack gap="sm">
              <h1 className="text-3xl font-bold text-gray-900">{entity.title}</h1>
              {entity.duration && (
                <span className="text-sm text-gray-500">{entity.duration} min read</span>
              )}
            </VStack>

            {/* Lesson content */}
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

            {/* Complete button */}
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

      {/* Footer navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <HStack justify="between" align="center" className="max-w-3xl mx-auto px-4 py-3">
          <button
            onClick={handlePrev}
            disabled={!hasPrevious}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {footerContent || (
            <span className="text-sm text-gray-500">
              {entity.isCompleted ? 'Lesson completed!' : 'Keep learning...'}
            </span>
          )}

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
};

LessonTemplate.displayName = 'LessonTemplate';
