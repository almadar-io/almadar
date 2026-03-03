/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus */
/**
 * ConceptDetailBoard Organism
 *
 * Concept detail view with tabs, prerequisite navigation, progress display,
 * and lesson/practice content. Extracted from ConceptDetailTemplate for flattener compliance.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Brain,
  ChevronRight,
  PlayCircle,
} from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  PageHeader,
  Section,
  ProgressBar,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import { FlashCardStack } from '../organisms/FlashCardStack';
import { ConceptMetaTags } from '../molecules/ConceptMetaTags';
import { LearningGoalDisplay } from '../molecules/LearningGoalDisplay';
import { ConceptStoryLink } from '../molecules/story/ConceptStoryLink';
import type { StorySummary } from '../types/knowledge';
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
  relatedStories?: StorySummary[];
}

export interface ConceptDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  entity?: ConceptEntity;
  graphId?: string;
  showBack?: boolean;
  backEvent?: string;
  startLessonEvent?: string;
  startPracticeEvent?: string;
  navigatePrerequisiteEvent?: string;
  generateLessonEvent?: string;
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
}: ConceptDetailBoardProps): React.JSX.Element | null {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [activeTab, setActiveTab] = useState<'overview' | 'lesson' | 'practice'>('overview');

  if (!entity) return null;

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
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        showBack={showBack}
        backEvent={backEvent}
        status={entity.layer !== undefined ? { label: t('concept.layer', { number: entity.layer }), variant: 'info' } : undefined}
        tabs={[
          { label: t('concept.tab.overview'), value: 'overview' },
          { label: t('concept.tab.lesson'), value: 'lesson' },
          { label: t('concept.tab.practice'), value: 'practice' },
        ]}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as typeof activeTab)}
        className="max-w-4xl mx-auto"
      />

      <Box className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <VStack gap="lg">
            <VStack gap="sm">
              <Typography variant="h1" className="text-3xl font-bold text-[var(--color-foreground)]">{entity.name}</Typography>
              {entity.description && (
                <Typography variant="body" className="text-[var(--color-foreground)] text-lg">{entity.description}</Typography>
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
              <Section title={t('concept.prerequisites')} variant="card">
                <VStack gap="xs">
                  {entity.prerequisites.map((prereq) => (
                    <Button
                      key={prereq}
                      onClick={() => handlePrerequisiteClick(prereq)}
                      variant="secondary"
                      className="text-left px-3 py-2 bg-[var(--color-surface)] rounded hover:bg-[var(--color-muted)] text-[var(--color-foreground)] flex items-center justify-between"
                    >
                      <Typography variant="small">{prereq}</Typography>
                      <ChevronRight size={16} className="text-[var(--color-muted-foreground)]" />
                    </Button>
                  ))}
                </VStack>
              </Section>
            )}

            {entity.progress !== undefined && (
              <Section title={t('concept.progress')} variant="card">
                <VStack gap="sm">
                  <HStack justify="between" align="center">
                    <Box />
                    <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">{entity.progress}%</Typography>
                  </HStack>
                  <ProgressBar value={entity.progress} max={100} size="sm" variant="primary" />
                </VStack>
              </Section>
            )}

            {entity.relatedStories && entity.relatedStories.length > 0 && (
              <VStack gap="sm">
                {entity.relatedStories.map((story) => (
                  <ConceptStoryLink
                    key={story.id}
                    story={story}
                    conceptName={entity.name}
                  />
                ))}
              </VStack>
            )}

            <HStack gap="md" wrap>
              {entity.hasLesson && (
                <Button
                  onClick={handleStartLesson}
                  variant="primary"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  {t('concept.startLesson')}
                </Button>
              )}
              {entity.flashcards && entity.flashcards.length > 0 && (
                <Button
                  onClick={handleStartPractice}
                  variant="secondary"
                  className="px-6 py-3 bg-gray-100 text-[var(--color-foreground)] font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Brain size={20} />
                  {t('concept.practice', { count: entity.flashcards.length })}
                </Button>
              )}
            </HStack>
          </VStack>
        )}

        {activeTab === 'lesson' && (
          <VStack gap="lg">
            {entity.lessonSegments && entity.lessonSegments.length > 0 ? (
              <SegmentRenderer segments={entity.lessonSegments} />
            ) : (
              <Section variant="card">
                <VStack gap="md" align="center" className="py-12">
                  <BookOpen size={48} className="text-[var(--color-muted-foreground)]" />
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">{t('concept.noLessonContent')}</Typography>
                  {!entity.hasLesson && (
                    <Button
                      onClick={() => {
                        if (generateLessonEvent) emit(`UI:${generateLessonEvent}`, { conceptId: entity.id });
                      }}
                      variant="primary"
                      size="sm"
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
                    >
                      <PlayCircle size={16} />
                      {t('concept.generateLesson')}
                    </Button>
                  )}
                </VStack>
              </Section>
            )}
          </VStack>
        )}

        {activeTab === 'practice' && (
          <VStack gap="lg">
            {entity.flashcards && entity.flashcards.length > 0 ? (
              <FlashCardStack cards={entity.flashcards} />
            ) : (
              <Section variant="card">
                <VStack gap="md" align="center" className="py-12">
                  <Brain size={48} className="text-[var(--color-muted-foreground)]" />
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">{t('concept.noPracticeCards')}</Typography>
                </VStack>
              </Section>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

ConceptDetailBoard.displayName = 'ConceptDetailBoard';

export default ConceptDetailBoard;
