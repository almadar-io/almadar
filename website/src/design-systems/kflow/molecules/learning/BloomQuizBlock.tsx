/**
 * BloomQuizBlock Molecule Component
 *
 * Practice question component with Bloom's Taxonomy level indicator.
 * Displays questions categorized by cognitive level (remember, understand,
 * apply, analyze, evaluate, create).
 *
 * Event Contract:
 * - Emits: UI:ANSWER_BLOOM { level, index, conceptId }
 * - Emits: UI:REVEAL_ANSWER { level, index }
 * - entityAware: true
 */

import React, { useState, useMemo } from "react";
import { CheckCircle } from "lucide-react";
import {
  Box,
  Button,
  Badge,
  Typography,
  Icon,
  Card,
  HStack,
  VStack,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { CodeBlock } from "../markdown/CodeBlock";
import { MarkdownContent } from "../markdown/MarkdownContent";
import {
  parseMarkdownWithCodeBlocks,
  BloomLevel,
} from "../../utils/parseLessonSegments";

// Bloom's Taxonomy configuration with colors and labels
// eslint-disable-next-line almadar/require-display-name
export const BLOOM_CONFIG: Record<
  BloomLevel,
  {
    color: string;
    bgColor: string;
    borderColor: string;
    labelKey: string;
    icon: string;
  }
> = {
  remember: {
    color: "bg-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-900/30",
    borderColor: "border-gray-200 dark:border-gray-700",
    labelKey: "bloom.remember",
    icon: "📝",
  },
  understand: {
    color: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-700",
    labelKey: "bloom.understand",
    icon: "💡",
  },
  apply: {
    color: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-700",
    labelKey: "bloom.apply",
    icon: "🔧",
  },
  analyze: {
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
    borderColor: "border-yellow-200 dark:border-yellow-700",
    labelKey: "bloom.analyze",
    icon: "🔍",
  },
  evaluate: {
    color: "bg-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    labelKey: "bloom.evaluate",
    icon: "⚖️",
  },
  create: {
    color: "bg-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-700",
    labelKey: "bloom.create",
    icon: "🎨",
  },
};

export interface BloomQuizBlockProps {
  /** Bloom's taxonomy level */
  level: BloomLevel;
  /** The question content (supports markdown) */
  question: string;
  /** The answer content (supports markdown) */
  answer: string;
  /** Question index for display */
  index?: number;
  /** Whether this question has been answered */
  isAnswered?: boolean;
  /** Concept ID for event payloads */
  conceptId?: string;
  /** Callback when answer is revealed */
  onAnswer?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const BloomQuizBlock: React.FC<BloomQuizBlockProps> = ({
  level,
  question,
  answer,
  index,
  isAnswered,
  conceptId,
  onAnswer,
  className,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [revealed, setRevealed] = useState(false);
  const config = BLOOM_CONFIG[level];

  const questionSegments = useMemo(
    () => parseMarkdownWithCodeBlocks(question),
    [question],
  );
  const answerSegments = useMemo(
    () => parseMarkdownWithCodeBlocks(answer),
    [answer],
  );

  const handleReveal = () => {
    if (!revealed) {
      eventBus.emit("UI:ANSWER_BLOOM", {
        entity: "Concept",
        level,
        index,
        conceptId,
      });
      onAnswer?.();
    }
    eventBus.emit("UI:REVEAL_ANSWER", { level, index, revealed: !revealed });
    setRevealed(!revealed);
  };

  return (
    <Card
      className={`${config.bgColor} ${config.borderColor} border ${className || ""}`}
    >
      <Box className="p-4">
        <VStack gap="md">
          {/* Header with question number and bloom level */}
          <HStack justify="between" align="center" className="flex-wrap gap-2">
            <HStack gap="sm" align="center">
              {index !== undefined && (
                <Typography
                  variant="small"
                  className="text-[var(--color-muted-foreground)] font-medium"
                >
                  {t('bloom.question', { number: index + 1 })}
                </Typography>
              )}
              <Badge className={`${config.color} text-white`} size="sm">
                {config.icon} {t(config.labelKey)}
              </Badge>
            </HStack>
            {isAnswered && (
              <Icon
                icon={CheckCircle}
                size="sm"
                className="text-green-600 dark:text-green-400"
              />
            )}
          </HStack>

          {/* Question content */}
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
            {revealed ? t('bloom.hideAnswer') : t('bloom.revealAnswer')}
          </Button>

          {/* Answer content */}
          {revealed && (
            <Card className="bg-white/80 dark:bg-gray-800/80 border border-indigo-100 dark:border-indigo-800">
              <Box className="p-3">
                <VStack gap="sm">
                  <Typography
                    variant="small"
                    className="text-[var(--color-foreground)] font-medium uppercase tracking-wide"
                  >
                    {t('bloom.answerLabel')}
                  </Typography>
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

BloomQuizBlock.displayName = "BloomQuizBlock";
