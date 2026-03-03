/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus */
/**
 * LessonBoard Organism
 *
 * Lesson content display with sidebar navigation, reading progress,
 * and prev/next navigation. Extracted from LessonTemplate for flattener compliance.
 */

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Menu, CheckCircle, Languages, RefreshCw } from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Card,
  Button,
  Typography,
  Badge,
  PageHeader,
  Drawer,
  ProgressBar,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';
import { SegmentRenderer } from '../organisms/SegmentRenderer';
import FlashCardsDisplay from '../organisms/FlashCardsDisplay';
import type { FlashCard } from '../types';
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
  /** Bilingual support */
  availableLanguages?: string[];
  selectedLanguage?: string;
  translatedContent?: string;
  translatedSegments?: Segment[];
  translationStatus?: 'idle' | 'loading' | 'ready' | 'error';
  /** Flashcards */
  flashcards?: FlashCard[];
  /** Assessment content (rendered below lesson) */
  assessmentContent?: React.ReactNode;
}

export interface SidebarItem {
  id: string;
  title: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface LessonBoardProps extends Omit<EntityDisplayProps, 'entity'> {
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
  languageChangeEvent?: string;
  regenerateTranslationEvent?: string;
  bilingualToggleEvent?: string;
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
  languageChangeEvent,
  regenerateTranslationEvent,
  bilingualToggleEvent,
  className = '',
}: LessonBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(false);

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

  const closeSidebar = () => setSidebarOpen(false);

  const handleLanguageChange = useCallback((language: string) => {
    if (languageChangeEvent) emit(`UI:${languageChangeEvent}`, { language });
  }, [emit, languageChangeEvent]);

  const handleRegenerateTranslation = useCallback(() => {
    if (regenerateTranslationEvent) emit(`UI:${regenerateTranslationEvent}`, { lessonId: entity.id });
  }, [emit, regenerateTranslationEvent, entity.id]);

  const handleBilingualToggle = useCallback(() => {
    const newMode = !bilingualMode;
    setBilingualMode(newMode);
    if (bilingualToggleEvent) emit(`UI:${bilingualToggleEvent}`, { enabled: newMode });
  }, [emit, bilingualToggleEvent, bilingualMode]);

  const showBilingual = entity.availableLanguages && entity.availableLanguages.length > 1;
  const showTranslation = bilingualMode && typeof entity.translatedContent === 'string' && entity.translatedContent.length > 0;

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <Box className="fixed top-0 left-0 right-0 z-50">
        <PageHeader
          title={entity.title}
          subtitle={entity.courseTitle}
          status={entity.isCompleted ? { label: t('lesson.completed'), variant: 'success' } : undefined}
        >
          <HStack gap="sm" align="center">
            <Button
              onClick={handleToggleSidebar}
              variant="secondary"
              size="sm"
              className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100"
            >
              <Menu size={20} />
            </Button>
            {entity.courseProgress !== undefined ? (
              <HStack gap="xs" align="center" className="w-32">
                <ProgressBar value={entity.courseProgress} max={100} size="sm" variant="primary" className="flex-1" />
                <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">{entity.courseProgress}%</Typography>
              </HStack>
            ) : null}
          </HStack>
        </PageHeader>
        <ProgressBar value={readingProgress} max={100} size="sm" variant="primary" className="h-1" />
      </Box>

      <Drawer
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        title={t('lesson.courseContent')}
        position="left"
        width="md"
        closeOnEscape
        closeOnOverlayClick
      >
        <VStack gap="none">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleSelectLesson(item.id)}
              variant="secondary"
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                item.isCurrent
                  ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
                  : item.isCompleted
                  ? 'text-[var(--color-muted-foreground)]'
                  : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
              }`}
            >
              <HStack gap="sm" align="center">
                {item.isCompleted ? <CheckCircle size={14} className="text-green-500" /> : null}
                <Typography variant="small" className="truncate">{item.title}</Typography>
              </HStack>
            </Button>
          ))}
        </VStack>
      </Drawer>

      <Box className="pt-20 pb-24">
        <Box className="max-w-3xl mx-auto px-4">
          <VStack gap="lg">
            {/* Language bar */}
            {showBilingual ? (
              <Card className="p-3">
                <HStack justify="between" align="center" wrap>
                  <HStack gap="xs" align="center">
                    <Languages size={16} className="text-[var(--color-muted-foreground)]" />
                    <HStack gap="xs">
                      {entity.availableLanguages?.map((lang) => (
                        <Button
                          key={lang}
                          onClick={() => handleLanguageChange(lang)}
                          variant={lang === entity.selectedLanguage ? 'primary' : 'secondary'}
                          size="sm"
                          className="px-3 py-1 text-xs"
                        >
                          {lang.toUpperCase()}
                        </Button>
                      ))}
                    </HStack>
                  </HStack>
                  <HStack gap="xs" align="center">
                    <Button
                      onClick={handleBilingualToggle}
                      variant={bilingualMode ? 'primary' : 'secondary'}
                      size="sm"
                      className="px-3 py-1 text-xs flex items-center gap-1"
                    >
                      <Languages size={14} />
                      {t('lesson.bilingual')}
                    </Button>
                    {entity.translationStatus === 'loading' ? (
                      <Badge variant="warning" size="sm">{t('lesson.translating')}</Badge>
                    ) : null}
                    {entity.translationStatus === 'error' ? (
                      <Button
                        onClick={handleRegenerateTranslation}
                        variant="secondary"
                        size="sm"
                        className="px-2 py-1 text-xs flex items-center gap-1"
                      >
                        <RefreshCw size={12} />
                        {t('lesson.retryTranslation')}
                      </Button>
                    ) : null}
                  </HStack>
                </HStack>
              </Card>
            ) : null}

            {entity.duration != null ? (
              <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">{t('lesson.minRead', { minutes: entity.duration })}</Typography>
            ) : null}

            {/* Primary content */}
            {entity.segments && entity.segments.length > 0 ? (
              <SegmentRenderer segments={entity.segments} />
            ) : (
              <Card>
                <Box
                  className="prose prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{ __html: entity.content }}
                />
              </Card>
            )}

            {/* Bilingual translated content (shown side-by-side or below) */}
            {showTranslation ? (
              <Card className="border-l-4 border-[var(--color-accent)]">
                {entity.translatedSegments && entity.translatedSegments.length > 0 ? (
                  <Box className="p-4">
                    <SegmentRenderer segments={entity.translatedSegments} />
                  </Box>
                ) : (
                  <Box
                    className="prose prose-indigo max-w-none p-4"
                    dangerouslySetInnerHTML={{ __html: entity.translatedContent ?? '' }}
                  />
                )}
              </Card>
            ) : null}

            {/* Flashcards */}
            {entity.flashcards && entity.flashcards.length > 0 ? (
              <FlashCardsDisplay flashCards={entity.flashcards} />
            ) : null}

            {/* Assessment content */}
            {entity.assessmentContent ? (
              <Box className="py-4">
                {String(entity.assessmentContent)}
              </Box>
            ) : null}

            {!entity.isCompleted ? (
              <Box className="text-center py-8">
                <Button
                  onClick={handleComplete}
                  variant="primary"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
                >
                  <CheckCircle size={20} />
                  {t('lesson.markAsComplete')}
                </Button>
              </Box>
            ) : null}
          </VStack>
        </Box>
      </Box>

      <Box className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <HStack justify="between" align="center" className="max-w-3xl mx-auto px-4 py-3">
          <Button
            onClick={handlePrev}
            disabled={!hasPrevious}
            variant="secondary"
            size="sm"
            className="px-4 py-2 text-sm font-medium text-[var(--color-foreground)] bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            {t('lesson.previous')}
          </Button>

          <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
            {entity.isCompleted ? t('lesson.lessonCompleted') : t('lesson.keepLearning')}
          </Typography>

          <Button
            onClick={handleNext}
            disabled={!hasNext}
            variant="primary"
            size="sm"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {t('lesson.next')}
            <ChevronRight size={16} />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

LessonBoard.displayName = 'LessonBoard';

export default LessonBoard;
