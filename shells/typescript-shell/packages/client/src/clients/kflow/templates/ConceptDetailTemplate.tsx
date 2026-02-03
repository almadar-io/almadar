/**
 * ConceptDetailTemplate - Template for displaying concept details with lesson and practice
 *
 * Almadar Entity Binding:
 * - Data flows through `entity` prop from Almadar state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:START_LESSON - When starting the lesson
 * - UI:START_PRACTICE - When starting practice/flashcards
 * - UI:NAVIGATE_PREREQUISITE - When clicking a prerequisite
 * - UI:NAVIGATE_PARENT - When clicking a parent concept
 * - UI:BACK - When navigating back
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
import { Box } from '../../../components/atoms/Box';
import { VStack } from '../../../components/atoms/Stack';
import { HStack } from '../../../components/atoms/Stack';
import { Card } from '../../../components/molecules/Card';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import { FlashCardStack } from '../organisms/FlashCardStack';
import { ConceptMetaTags } from '../molecules/ConceptMetaTags';
import { LearningGoalDisplay } from '../molecules/LearningGoalDisplay';
import { useEventBus } from '../../../hooks/useEventBus';
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

export interface ConceptDetailTemplateProps {
  /** Concept entity data */
  entity: ConceptEntity;
  /** Graph ID for context */
  graphId?: string;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ConceptDetailTemplate: React.FC<ConceptDetailTemplateProps> = ({
  entity,
  graphId,
  showBack = true,
  className = '',
}) => {
  const { emit } = useEventBus();
  const [activeTab, setActiveTab] = useState<'overview' | 'lesson' | 'practice'>('overview');

  const handleBack = () => {
    emit('UI:BACK', { fromConcept: entity.id });
  };

  const handleStartLesson = () => {
    setActiveTab('lesson');
    emit('UI:START_LESSON', { conceptId: entity.id });
  };

  const handleStartPractice = () => {
    setActiveTab('practice');
    emit('UI:START_PRACTICE', { conceptId: entity.id });
  };

  const handlePrerequisiteClick = (prereq: string) => {
    emit('UI:NAVIGATE_PREREQUISITE', { prerequisiteName: prereq, fromConcept: entity.id });
  };

  return (
    <Box className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <HStack justify="between" align="center" className="max-w-4xl mx-auto px-4 py-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded flex items-center gap-1"
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

        {/* Tabs */}
        <HStack gap="none" className="max-w-4xl mx-auto px-4 border-t border-gray-100">
          {['overview', 'lesson', 'practice'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </HStack>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <VStack gap="lg">
            {/* Title and description */}
            <VStack gap="sm">
              <h1 className="text-3xl font-bold text-gray-900">{entity.name}</h1>
              {entity.description && (
                <p className="text-gray-600 text-lg">{entity.description}</p>
              )}
            </VStack>

            {/* Meta tags */}
            <ConceptMetaTags
              layer={entity.layer}
              isSeed={entity.isSeed}
              parents={entity.parents || []}
            />

            {/* Learning goal */}
            {entity.learningGoal && (
              <LearningGoalDisplay
                goal={entity.learningGoal}
                layerNumber={entity.layer || 0}
                graphId={graphId}
              />
            )}

            {/* Prerequisites */}
            {entity.prerequisites && entity.prerequisites.length > 0 && (
              <Card>
                <VStack gap="sm">
                  <span className="font-semibold text-gray-900">Prerequisites</span>
                  <VStack gap="xs">
                    {entity.prerequisites.map((prereq) => (
                      <button
                        key={prereq}
                        onClick={() => handlePrerequisiteClick(prereq)}
                        className="text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 text-gray-700 flex items-center justify-between"
                      >
                        <span>{prereq}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </button>
                    ))}
                  </VStack>
                </VStack>
              </Card>
            )}

            {/* Progress */}
            {entity.progress !== undefined && (
              <Card>
                <VStack gap="sm">
                  <HStack justify="between" align="center">
                    <span className="font-semibold text-gray-900">Progress</span>
                    <span className="text-sm text-gray-500">{entity.progress}%</span>
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

            {/* Action buttons */}
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
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
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
                  <BookOpen size={48} className="text-gray-300" />
                  <span className="text-gray-500">No lesson content available</span>
                  {!entity.hasLesson && (
                    <button
                      onClick={() => emit('UI:GENERATE_LESSON', { conceptId: entity.id })}
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
                  <Brain size={48} className="text-gray-300" />
                  <span className="text-gray-500">No practice cards available</span>
                </VStack>
              </Card>
            )}
          </VStack>
        )}
      </main>
    </Box>
  );
};

ConceptDetailTemplate.displayName = 'ConceptDetailTemplate';
