/**
 * StoryLessonView Molecule
 *
 * Renders the Lesson step as cinematic full-bleed sections (background image
 * with gradient overlay + white text on top):
 * - StoryLessonPrincipleView: principle + explanation
 * - StoryLessonQuizView: multiple-choice "Try It" quiz
 * - StoryLessonPatternView: deeper pattern insight (optional)
 * - StoryLessonView: all sections combined (backward compat)
 *
 * Event Contract:
 * - No events emitted (callbacks passed from organism)
 * - entityAware: false
 */

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  Badge,
  Icon,
  useTranslate,
} from '@almadar/ui';
import { BookOpen, Puzzle, CheckCircle, XCircle } from 'lucide-react';
import { MarkdownContent } from '../markdown/MarkdownContent';

// ---------------------------------------------------------------------------
// Shared cinematic background helper
// ---------------------------------------------------------------------------

interface CinematicSectionProps {
  backgroundImage?: string;
  className?: string;
  children: React.ReactNode;
}

function CinematicSection({ backgroundImage, className, children }: CinematicSectionProps): React.JSX.Element {
  if (backgroundImage) {
    return (
      <Box className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={backgroundImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(4px) brightness(0.4)',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 80%)',
          }}
        />
        <Box
          style={{ position: 'relative', minHeight: '100vh' }}
          className="flex flex-col justify-center"
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box className={className}>
      <Box
        style={{ minHeight: '100vh' }}
        className="flex flex-col justify-center"
      >
        {children}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// StoryLessonPrincipleView — principle + explanation
// ---------------------------------------------------------------------------

export interface StoryLessonPrincipleViewProps {
  principle: string;
  explanation: string;
  backgroundImage?: string;
  className?: string;
}

export const StoryLessonPrincipleView: React.FC<StoryLessonPrincipleViewProps> = ({
  principle,
  explanation,
  backgroundImage,
  className,
}) => {
  const { t } = useTranslate();
  const hasImage = Boolean(backgroundImage);

  return (
    <CinematicSection backgroundImage={backgroundImage} className={className}>
      <VStack gap="lg" className="max-w-2xl mx-auto py-6 px-6">
        {/* Principle card */}
        <Box
          className={`w-full p-6 rounded-xl border-l-4 ${
            hasImage
              ? 'bg-white/10 backdrop-blur-sm border-l-white/60'
              : 'bg-[var(--color-card)] border-l-[var(--color-foreground)]'
          }`}
        >
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <Icon icon={BookOpen} size="sm" className={hasImage ? 'text-white/60' : ''} />
              <Typography
                variant="small"
                weight="bold"
                className={`uppercase tracking-wider ${hasImage ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'}`}
              >
                {t('story.principle')}
              </Typography>
            </HStack>
            <Typography
              variant="h3"
              weight="bold"
              className={hasImage ? 'text-white' : 'text-[var(--color-foreground)]'}
            >
              {principle}
            </Typography>
          </VStack>
        </Box>

        {/* Explanation card */}
        <Box
          className={`w-full p-6 rounded-xl ${
            hasImage
              ? 'bg-white/10 backdrop-blur-sm'
              : 'bg-[var(--color-card)]'
          }`}
        >
          <VStack gap="sm">
            <Typography
              variant="small"
              weight="bold"
              className={`uppercase tracking-wider ${hasImage ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'}`}
            >
              {t('story.howItWorks')}
            </Typography>
            <Box className={hasImage ? 'text-white/90 [&_p]:text-white/90 [&_strong]:text-white [&_em]:text-white/80' : ''}>
              <MarkdownContent content={explanation} />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </CinematicSection>
  );
};

StoryLessonPrincipleView.displayName = 'StoryLessonPrincipleView';

// ---------------------------------------------------------------------------
// StoryLessonQuizView — "Try It" quiz
// ---------------------------------------------------------------------------

export interface StoryLessonQuizViewProps {
  tryItQuestion: string;
  tryItOptions: string[];
  tryItCorrectIndex: number;
  onTryItAnswer?: (correct: boolean) => void;
  backgroundImage?: string;
  className?: string;
}

export const StoryLessonQuizView: React.FC<StoryLessonQuizViewProps> = ({
  tryItQuestion,
  tryItOptions,
  tryItCorrectIndex,
  onTryItAnswer,
  backgroundImage,
  className,
}) => {
  const { t } = useTranslate();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === tryItCorrectIndex;
  const hasImage = Boolean(backgroundImage);

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    onTryItAnswer?.(index === tryItCorrectIndex);
  };

  return (
    <CinematicSection backgroundImage={backgroundImage} className={className}>
      <VStack gap="lg" className="max-w-2xl mx-auto py-6 px-6">
        <Box
          className={`w-full p-6 rounded-xl ${
            hasImage ? 'bg-white/10 backdrop-blur-sm' : 'bg-[var(--color-card)]'
          }`}
        >
          <VStack gap="md">
            <HStack gap="xs" align="center">
              <Badge size="sm" variant="primary">{t('story.tryIt')}</Badge>
            </HStack>
            <Typography
              variant="body"
              weight="medium"
              className={hasImage ? 'text-white' : 'text-[var(--color-foreground)]'}
            >
              {tryItQuestion}
            </Typography>
            <VStack gap="sm">
              {tryItOptions.map((option, i) => {
                let optionStyle: string;
                if (hasAnswered) {
                  if (i === tryItCorrectIndex) {
                    optionStyle = 'border-green-500 bg-green-500/20';
                  } else if (i === selectedAnswer) {
                    optionStyle = 'border-red-500 bg-red-500/20';
                  } else {
                    optionStyle = hasImage
                      ? 'border-white/20 opacity-50'
                      : 'border-[var(--color-border)] opacity-50';
                  }
                } else {
                  optionStyle = hasImage
                    ? 'border-white/30 hover:border-white/60 cursor-pointer'
                    : 'border-[var(--color-border)] hover:border-[var(--color-foreground)] cursor-pointer';
                }

                return (
                  <Button
                    key={i}
                    variant="secondary"
                    className={`w-full text-left justify-start p-4 border-2 ${optionStyle}`}
                    onClick={() => handleSelectAnswer(i)}
                    disabled={hasAnswered}
                  >
                    <HStack gap="sm" align="center" className="w-full">
                      <Typography variant="body" className={hasImage ? 'text-white' : ''}>
                        {option}
                      </Typography>
                      {hasAnswered && i === tryItCorrectIndex && (
                        <Icon icon={CheckCircle} size="sm" className="text-green-500 ml-auto" />
                      )}
                      {hasAnswered && i === selectedAnswer && i !== tryItCorrectIndex && (
                        <Icon icon={XCircle} size="sm" className="text-red-500 ml-auto" />
                      )}
                    </HStack>
                  </Button>
                );
              })}
            </VStack>

            {hasAnswered && (
              <Typography
                variant="body"
                weight="medium"
                className={isCorrect ? 'text-green-400' : 'text-red-400'}
              >
                {isCorrect ? t('story.correct') : t('story.tryAgain')}
              </Typography>
            )}
          </VStack>
        </Box>
      </VStack>
    </CinematicSection>
  );
};

StoryLessonQuizView.displayName = 'StoryLessonQuizView';

// ---------------------------------------------------------------------------
// StoryLessonPatternView — deeper pattern insight
// ---------------------------------------------------------------------------

export interface StoryLessonPatternViewProps {
  pattern: string;
  backgroundImage?: string;
  className?: string;
}

export const StoryLessonPatternView: React.FC<StoryLessonPatternViewProps> = ({
  pattern,
  backgroundImage,
  className,
}) => {
  const { t } = useTranslate();
  const hasImage = Boolean(backgroundImage);

  return (
    <CinematicSection backgroundImage={backgroundImage} className={className}>
      <VStack gap="lg" className="max-w-2xl mx-auto py-6 px-6">
        <Box
          className={`w-full p-6 rounded-xl ${
            hasImage ? 'bg-white/10 backdrop-blur-sm' : 'bg-[var(--color-muted)]'
          }`}
        >
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <Icon icon={Puzzle} size="sm" className={hasImage ? 'text-white/60' : ''} />
              <Typography
                variant="small"
                weight="bold"
                className={`uppercase tracking-wider ${hasImage ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'}`}
              >
                {t('story.pattern')}
              </Typography>
            </HStack>
            <Box className={hasImage ? 'text-white/90 [&_p]:text-white/90 [&_strong]:text-white [&_em]:text-white/80' : ''}>
              <MarkdownContent content={pattern} />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </CinematicSection>
  );
};

StoryLessonPatternView.displayName = 'StoryLessonPatternView';

// ---------------------------------------------------------------------------
// StoryLessonView — all sections combined (backward compat)
// ---------------------------------------------------------------------------

export interface StoryLessonViewProps {
  principle: string;
  explanation: string;
  pattern: string;
  tryItQuestion: string;
  tryItOptions: string[];
  tryItCorrectIndex: number;
  onTryItAnswer?: (correct: boolean) => void;
  backgroundImage?: string;
  className?: string;
}

export const StoryLessonView: React.FC<StoryLessonViewProps> = ({
  principle,
  explanation,
  pattern,
  tryItQuestion,
  tryItOptions,
  tryItCorrectIndex,
  onTryItAnswer,
  backgroundImage,
  className,
}) => {
  return (
    <Box className={className}>
      <VStack gap="none">
        <StoryLessonPrincipleView principle={principle} explanation={explanation} backgroundImage={backgroundImage} />
        <StoryLessonQuizView
          tryItQuestion={tryItQuestion}
          tryItOptions={tryItOptions}
          tryItCorrectIndex={tryItCorrectIndex}
          onTryItAnswer={onTryItAnswer}
          backgroundImage={backgroundImage}
        />
        <StoryLessonPatternView pattern={pattern} backgroundImage={backgroundImage} />
      </VStack>
    </Box>
  );
};

StoryLessonView.displayName = 'StoryLessonView';
