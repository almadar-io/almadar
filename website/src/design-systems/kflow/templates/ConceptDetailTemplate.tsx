/**
 * ConceptDetailTemplate - Template for displaying concept details with lesson and practice
 *
 * Pure declarative wrapper for ConceptDetailBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: ConceptDetailPage
 * Entity: Concept
 * ViewType: detail
 *
 * Events Emitted (via ConceptDetailBoard):
 * - UI:BACK - When navigating back
 * - UI:START_LESSON - When starting the lesson
 * - UI:START_PRACTICE - When starting practice/flashcards
 * - UI:NAVIGATE_PREREQUISITE - When clicking a prerequisite
 * - UI:GENERATE_LESSON - When generating a lesson
 */

import React from 'react';
import { ConceptDetailBoard } from '../organisms/ConceptDetailBoard';
import type { ConceptEntity } from '../organisms/ConceptDetailBoard';

export type { ConceptEntity } from '../organisms/ConceptDetailBoard';

export interface ConceptDetailTemplateProps {
  entity: ConceptEntity;
  graphId?: string;
  showBack?: boolean;
  className?: string;
}

export const ConceptDetailTemplate: React.FC<ConceptDetailTemplateProps> = ({
  entity,
  graphId,
  showBack,
  className,
}) => {
  return (
    <ConceptDetailBoard
      entity={entity}
      graphId={graphId}
      showBack={showBack}
      backEvent="BACK"
      startLessonEvent="START_LESSON"
      startPracticeEvent="START_PRACTICE"
      navigatePrerequisiteEvent="NAVIGATE_PREREQUISITE"
      generateLessonEvent="GENERATE_LESSON"
      className={className}
    />
  );
};

ConceptDetailTemplate.displayName = 'ConceptDetailTemplate';
