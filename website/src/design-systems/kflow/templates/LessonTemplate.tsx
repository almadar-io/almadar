/**
 * LessonTemplate - Template for displaying lesson content with navigation
 *
 * Pure declarative wrapper for LessonBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: LessonPage
 * Entity: Lesson
 * ViewType: detail
 *
 * Events Emitted (via LessonBoard):
 * - UI:LESSON_COMPLETE - When lesson is marked complete
 * - UI:LESSON_NEXT - When navigating to next lesson
 * - UI:LESSON_PREV - When navigating to previous lesson
 * - UI:TOGGLE_SIDEBAR - When sidebar is toggled
 * - UI:SELECT_LESSON - When selecting a lesson from sidebar
 */

import React from 'react';
import { LessonBoard } from '../organisms/LessonBoard';
import type { LessonEntity, SidebarItem } from '../organisms/LessonBoard';

export type { LessonEntity, SidebarItem } from '../organisms/LessonBoard';

export interface LessonTemplateProps {
  entity: LessonEntity;
  sidebarItems?: SidebarItem[];
  hasPrevious?: boolean;
  hasNext?: boolean;
  readingProgress?: number;
  className?: string;
}

export const LessonTemplate: React.FC<LessonTemplateProps> = ({
  entity,
  sidebarItems,
  hasPrevious,
  hasNext,
  readingProgress,
  className,
}) => {
  return (
    <LessonBoard
      entity={entity}
      sidebarItems={sidebarItems}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
      readingProgress={readingProgress}
      completeEvent="LESSON_COMPLETE"
      nextEvent="LESSON_NEXT"
      prevEvent="LESSON_PREV"
      toggleSidebarEvent="TOGGLE_SIDEBAR"
      selectLessonEvent="SELECT_LESSON"
      className={className}
    />
  );
};

LessonTemplate.displayName = 'LessonTemplate';
