/**
 * SegmentRenderer Organism Component
 *
 * Renders a list of lesson segments including markdown, code blocks,
 * quizzes, and learning science components (activation, connection,
 * reflection, bloom).
 *
 * Event Contract:
 * - Emits events from child components (ActivationBlock, ReflectionBlock, BloomQuizBlock, etc.)
 * - entityAware: true
 */

import React from "react";
import { Box, VStack } from '@almadar/ui';
import { CodeBlock } from "../molecules/markdown/CodeBlock";
import { MarkdownContent } from "../molecules/markdown/MarkdownContent";
import { ActivationBlock } from "../molecules/learning/ActivationBlock";
import { ConnectionBlock } from "../molecules/learning/ConnectionBlock";
import { ReflectionBlock } from "../molecules/learning/ReflectionBlock";
import { BloomQuizBlock } from "../molecules/learning/BloomQuizBlock";
import { QuizBlock } from "../molecules/learning/QuizBlock";
import { Segment, BloomLevel } from "../utils/parseLessonSegments";

export interface UserProgress {
  /** Saved activation response */
  activationResponse?: string;
  /** Saved reflection notes by index */
  reflectionNotes?: string[];
  /** Bloom questions answered by index */
  bloomAnswered?: Record<number, boolean>;
}

export interface SegmentRendererProps {
  /** Array of segments to render */
  segments?: Segment[];
  /** Concept ID for event payloads */
  conceptId?: string;
  /** User progress tracking data */
  userProgress?: UserProgress;
  /** Callback when activation response is saved */
  onSaveActivation?: (response: string) => void;
  /** Callback when reflection note is saved */
  onSaveReflection?: (index: number, note: string) => void;
  /** Callback when bloom question is answered */
  onAnswerBloom?: (index: number, level: BloomLevel) => void;
  /** Additional CSS classes for container */
  className?: string;
  /** Additional CSS classes for inner wrapper */
  containerClassName?: string;
  // Entity-aware props (for schema compatibility)
  /** Entity type */
  entity?: string;
  /** Data array */
  data?: unknown[];
  /** Display variant */
  variant?: string;
  /** Item actions */
  itemActions?: Array<{
    label: string;
    event: string;
    onClick?: (row: Record<string, unknown>) => void;
  }>;
  /** Fields to display */
  displayFields?: string[];
  /** Show content flag */
  showContent?: boolean;
  /** Show lessons flag */
  showLessons?: boolean;
  /** Show progress flag */
  showProgress?: boolean;
  /** Actions */
  actions?: Array<{ label: string; event: string }>;
  /** Show modules flag */
  showModules?: boolean;
}

export const SegmentRenderer: React.FC<SegmentRendererProps> = ({
  segments = [],
  conceptId,
  userProgress,
  onSaveActivation,
  onSaveReflection,
  onAnswerBloom,
  className,
  containerClassName = "border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 overflow-x-auto",
}) => {
  if (!segments || segments.length === 0) {
    return null;
  }

  // Track indices for reflect and bloom segments
  let reflectIndex = 0;
  let bloomIndex = 0;

  return (
    <Box className={className}>
      <Box className={containerClassName}>
        <VStack gap="lg">
          {segments.map((segment, index) => {
            if (segment.type === "markdown") {
              return (
                <MarkdownContent
                  key={`md-${index}`}
                  content={segment.content}
                />
              );
            }

            if (segment.type === "code") {
              return (
                <CodeBlock
                  key={`code-${index}`}
                  language={segment.language}
                  code={segment.content}
                />
              );
            }

            if (segment.type === "quiz") {
              return (
                <QuizBlock
                  key={`quiz-${index}`}
                  question={segment.question}
                  answer={segment.answer}
                  index={index}
                />
              );
            }

            if (segment.type === "activate") {
              return (
                <ActivationBlock
                  key={`activate-${index}`}
                  question={segment.question}
                  savedResponse={userProgress?.activationResponse}
                  conceptId={conceptId}
                  onSave={onSaveActivation}
                />
              );
            }

            if (segment.type === "connect") {
              return (
                <ConnectionBlock
                  key={`connect-${index}`}
                  content={segment.content}
                />
              );
            }

            if (segment.type === "reflect") {
              const currentReflectIndex = reflectIndex++;
              return (
                <ReflectionBlock
                  key={`reflect-${index}`}
                  prompt={segment.prompt}
                  index={currentReflectIndex}
                  savedNote={
                    userProgress?.reflectionNotes?.[currentReflectIndex]
                  }
                  conceptId={conceptId}
                  onSave={(note) =>
                    onSaveReflection?.(currentReflectIndex, note)
                  }
                />
              );
            }

            if (segment.type === "bloom") {
              const currentBloomIndex = bloomIndex++;
              return (
                <BloomQuizBlock
                  key={`bloom-${index}`}
                  level={segment.level}
                  question={segment.question}
                  answer={segment.answer}
                  index={currentBloomIndex}
                  isAnswered={userProgress?.bloomAnswered?.[currentBloomIndex]}
                  conceptId={conceptId}
                  onAnswer={() =>
                    onAnswerBloom?.(currentBloomIndex, segment.level)
                  }
                />
              );
            }

            return null;
          })}
        </VStack>
      </Box>
    </Box>
  );
};

SegmentRenderer.displayName = "SegmentRenderer";
