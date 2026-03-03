/**
 * QuizBlock Molecule Component
 *
 * Simple question/answer reveal component for embedded quizzes
 * in lesson content. Unlike BloomQuizBlock, this doesn't have
 * cognitive level classification.
 *
 * Event Contract:
 * - Emits: UI:REVEAL_QUIZ { index, revealed }
 * - entityAware: false
 */

import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  VStack,
  Typography,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { CodeBlock } from "../markdown/CodeBlock";
import { MarkdownContent } from "../markdown/MarkdownContent";
import { parseMarkdownWithCodeBlocks } from "../../utils/parseLessonSegments";

export interface QuizBlockProps {
  /** The question content (supports markdown) */
  question?: string;
  /** The answer content (supports markdown) */
  answer?: string;
  /** Question index */
  index?: number;
  /** Additional CSS classes */
  className?: string;
  // Entity-aware props (for schema compatibility)
  /** Entity type */
  entity?: unknown;
  /** Data to display */
  data?: Record<string, unknown>;
  /** Actions */
  actions?: Array<{ label: string; event: string }>;
  /** Item actions */
  itemActions?: Array<{
    label: string;
    event: string;
    onClick?: (row: Record<string, unknown>) => void;
  }>;
  /** Display variant */
  variant?: string;
  /** Show questions flag */
  showQuestions?: boolean;
  /** Fields to display */
  displayFields?: string[];
}

export const QuizBlock = ({
  question = "",
  answer = "",
  index,
  className,
}: QuizBlockProps) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [revealed, setRevealed] = useState(false);

  const questionSegments = useMemo(
    () => parseMarkdownWithCodeBlocks(question || ""),
    [question],
  );
  const answerSegments = useMemo(
    () => parseMarkdownWithCodeBlocks(answer || ""),
    [answer],
  );

  const handleReveal = () => {
    const newRevealed = !revealed;
    eventBus.emit("UI:REVEAL_QUIZ", { index, revealed: newRevealed });
    setRevealed(newRevealed);
  };

  return (
    <Card
      className={`bg-indigo-50/40 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 ${className || ""}`}
    >
      <Box className="p-4">
        <VStack gap="md">
          {/* Question */}
          <Box className="font-semibold text-indigo-900 dark:text-indigo-200">
            <VStack gap="sm">
              {questionSegments.map((segment, idx) =>
                segment.type === "markdown" ? (
                  <MarkdownContent
                    key={`q-md-${idx}`}
                    content={segment.content}
                  />
                ) : (
                  <CodeBlock
                    key={`q-code-${idx}`}
                    language={segment.language || "text"}
                    code={segment.content}
                  />
                ),
              )}
            </VStack>
          </Box>

          {/* Reveal button */}
          <Button variant="primary" size="sm" onClick={handleReveal}>
            {revealed ? t('quiz.hideAnswer') : t('quiz.revealAnswer')}
          </Button>

          {/* Answer */}
          {revealed && (
            <Card className="bg-white/80 dark:bg-gray-800/80 border border-indigo-100 dark:border-indigo-800">
              <Box className="p-3">
                <VStack gap="sm">
                  {answerSegments.map((segment, idx) =>
                    segment.type === "markdown" ? (
                      <MarkdownContent
                        key={`a-md-${idx}`}
                        content={segment.content}
                      />
                    ) : (
                      <CodeBlock
                        key={`a-code-${idx}`}
                        language={segment.language || "text"}
                        code={segment.content}
                      />
                    ),
                  )}
                </VStack>
              </Box>
            </Card>
          )}
        </VStack>
      </Box>
    </Card>
  );
};

QuizBlock.displayName = "QuizBlock";
