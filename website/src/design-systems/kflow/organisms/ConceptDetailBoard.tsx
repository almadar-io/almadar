/**
 * ConceptDetailBoard Organism
 *
 * Concept detail view with tabs, prerequisite navigation, progress display,
 * and lesson/practice content. Extracted from ConceptDetailTemplate for flattener compliance.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Brain,
  ChevronRight,
  Layers,
  PlayCircle,
} from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Card,
  useEventBus,
} from '@almadar/ui';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import { FlashCardStack } from '../organisms/FlashCardStack';
import { ConceptMetaTags } from '../molecules/ConceptMetaTags';
import { LearningGoalDisplay } from '../molecules/LearningGoalDisplay';
import type { Segment } from '../utils/parseLessonSegments';
import type { FlashCardEntity } from '../organisms/FlashCard';

export interface ConceptEntity {
  id: string;
  name: string;
  description?: string;
  layer?: number;
  isSeed?: boolean;
  prerequisites?: string[];
  parents?: string[];
  learningGoal?: string;
  hasLesson?: boolean;
  lessonSegments?: Segment[];
  flashcards?: FlashCardEntity[];
  progress?: number;
}

export interface ConceptDetailBoardProps {
  entity: ConceptEntity;
  graphId?: string;
  showBack?: boolean;
  backEvent?: string;
  startLessonEvent?: string;
  startPracticeEvent?: string;
  navigatePrerequisiteEvent?: string;
  generateLessonEvent?: string;
  className?: string;
}

export function ConceptDetailBoard({
  entity,
  graphId,
  showBack = true,
  backEvent,
  startLessonEvent,
  startPracticeEvent,
  navigatePrerequisiteEvent,
  generateLessonEvent,
  className = '',
}: ConceptDetailBoardProps): JSX.Element {
  const { emit } = useEventBus();
  const [activeTab, setActiveTab] = useState<'overview' | 'lesson' | 'practice'>('overview');

  const handleBack = () => {
    if (backEvent) emit(`UI:${backEvent}`, { fromConcept: entity.id });
  };

  const handleStartLesson = () => {
    setActiveTab('lesson');
    if (startLessonEvent) emit(`UI:${startLessonEvent}`, { conceptId: entity.id });
  };

  const handleStartPractice = () => {
    setActiveTab('practice');
    if (startPracticeEvent) emit(`UI:${startPracticeEvent}`, { conceptId: entity.id });
  };

  const handlePrerequisiteClick = (prereq: string) => {
    if (navigatePrerequisiteEvent) {
      emit(`UI:${navigatePrerequisiteEvent}`, { prerequisiteName: prereq, fromConcept: entity.id });
    }
  };

  return (
    <Box className={`min-h-screen bg-gray-50 ${className}`}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <HStack justify="between" align="center" className="max-w-4xl mx-auto px-4 py-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded flex items-center gap-1"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back</span>
            </button>
          )}
          <HStack gap="sm">
            {entity.layer !== undefined && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                <Layers size={12} />
                Layer {entity.layer}
              </span>
            )}
          </HStack>
        </HStack>

        <HStack gap="none" className="max-w-4xl mx-auto px-4 border-t border-gray-100">
          {['overview', 'lesson', 'practice'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </HStack>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <VStack gap="lg">
            <VStack gap="sm">
              <h1 className="text-3xl font-bold text-[var(--color-foreground)]">{entity.name}</h1>
              {entity.description && (
                <p className="text-[var(--color-foreground)] text-lg">{entity.description}</p>
              )}
            </VStack>

            <ConceptMetaTags
              layer={entity.layer}
              isSeed={entity.isSeed}
              parents={entity.parents || []}
            />

            {entity.learningGoal && (
              <LearningGoalDisplay
                goal={entity.learningGoal}
                layerNumber={entity.layer || 0}
                graphId={graphId}
              />
            )}

            {entity.prerequisites && entity.prerequisites.length > 0 && (
              <Card>
                <VStack gap="sm">
                  <span className="font-semibold text-[var(--color-foreground)]">Prerequisites</span>
                  <VStack gap="xs">
                    {entity.prerequisites.map((prereq) => (
                      <button
                        key={prereq}
                        onClick={() => handlePrerequisiteClick(prereq)}
                        className="text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 text-[var(--color-foreground)] flex items-center justify-between"
                      >
                        <span>{prereq}</span>
                        <ChevronRight size={16} className="text-[var(--color-muted-foreground)]" />
                      </button>
                    ))}
                  </VStack>
                </VStack>
              </Card>
            )}

            {entity.progress !== undefined && (
              <Card>
                <VStack gap="sm">
                  <HStack justify="between" align="center">
                    <span className="font-semibold text-[var(--color-foreground)]">Progress</span>
                    <span className="text-sm text-[var(--color-muted-foreground)]">{entity.progress}%</span>
                  </HStack>
                  <Box className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Box
                      className="h-full bg-indigo-500 transition-all"
                      style={{ width: `${entity.progress}%` }}
                    />
                  </Box>
                </VStack>
              </Card>
            )}

            <HStack gap="md" wrap>
              {entity.hasLesson && (
                <button
                  onClick={handleStartLesson}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  Start Lesson
                </button>
              )}
              {entity.flashcards && entity.flashcards.length > 0 && (
                <button
                  onClick={handleStartPractice}
                  className="px-6 py-3 bg-gray-100 text-[var(--color-foreground)] font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Brain size={20} />
                  Practice ({entity.flashcards.length} cards)
                </button>
              )}
            </HStack>
          </VStack>
        )}

        {activeTab === 'lesson' && (
          <VStack gap="lg">
            {entity.lessonSegments && entity.lessonSegments.length > 0 ? (
              <SegmentRenderer segments={entity.lessonSegments} />
            ) : (
              <Card>
                <VStack gap="md" align="center" className="py-12">
                  <BookOpen size={48} className="text-[var(--color-muted-foreground)]" />
                  <span className="text-[var(--color-muted-foreground)]">No lesson content available</span>
                  {!entity.hasLesson && (
                    <button
                      onClick={() => {
                        if (generateLessonEvent) emit(`UI:${generateLessonEvent}`, { conceptId: entity.id });
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
                    >
                      <PlayCircle size={16} />
                      Generate Lesson
                    </button>
                  )}
                </VStack>
              </Card>
            )}
          </VStack>
        )}

        {activeTab === 'practice' && (
          <VStack gap="lg">
            {entity.flashcards && entity.flashcards.length > 0 ? (
              <FlashCardStack cards={entity.flashcards} />
            ) : (
              <Card>
                <VStack gap="md" align="center" className="py-12">
                  <Brain size={48} className="text-[var(--color-muted-foreground)]" />
                  <span className="text-[var(--color-muted-foreground)]">No practice cards available</span>
                </VStack>
              </Card>
            )}
          </VStack>
        )}
      </main>
    </Box>
  );
}

ConceptDetailBoard.displayName = 'ConceptDetailBoard';

export default ConceptDetailBoard;
