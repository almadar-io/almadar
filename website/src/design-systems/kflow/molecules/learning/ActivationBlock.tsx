/**
 * ActivationBlock Molecule Component
 *
 * Pre-lesson activation component that displays a thought-provoking question
 * to activate prior knowledge before diving into new content.
 *
 * Event Contract:
 * - Emits: UI:SAVE_ACTIVATION { response, conceptId }
 * - Emits: UI:SKIP_ACTIVATION { conceptId }
 * - entityAware: true
 */

import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import {
  Box,
  Button,
  Textarea,
  Typography,
  Icon,
  VStack,
  HStack,
  Card,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface ActivationBlockProps {
  /** The activation question to display */
  question: string;
  /** Previously saved response (from entity) */
  savedResponse?: string;
  /** Concept ID for event payloads */
  conceptId?: string;
  /** Callback when response is saved */
  onSave?: (response: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const ActivationBlock = ({
  question,
  savedResponse,
  conceptId,
  onSave,
  className,
}: ActivationBlockProps) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [response, setResponse] = useState(savedResponse || "");
  const [isExpanded, setIsExpanded] = useState(!savedResponse);

  const handleSubmit = () => {
    eventBus.emit("UI:SAVE_ACTIVATION", {
      entity: "Concept",
      conceptId,
      response,
    });
    onSave?.(response);
    setIsExpanded(false);
  };

  const handleSkip = () => {
    eventBus.emit("UI:SKIP_ACTIVATION", {
      entity: "Concept",
      conceptId,
    });
    onSave?.("");
    setIsExpanded(false);
  };

  return (
    <Card
      className={`bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 ${className || ""}`}
    >
      <Box className="p-5">
        <HStack gap="md" align="start">
          <Icon
            icon={Lightbulb}
            size="md"
            className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1"
          />
          <VStack gap="sm" className="flex-1">
            <Typography
              variant="h4"
              className="font-semibold text-indigo-900 dark:text-indigo-100"
            >
              {t('activation.title')}
            </Typography>
            <Typography
              variant="body"
              className="text-[var(--color-foreground)]"
            >
              {question}
            </Typography>

            {isExpanded ? (
              <VStack gap="md" className="w-full mt-2">
                <Textarea
                  placeholder={t('activation.placeholder')}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={3}
                  className="w-full border-indigo-300 dark:border-indigo-700 focus:ring-indigo-500"
                />
                <HStack gap="sm">
                  <Button variant="primary" onClick={handleSubmit}>
                    {t('activation.continueToLesson')}
                  </Button>
                  <Button variant="ghost" onClick={handleSkip}>
                    {t('activation.skipForNow')}
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(true)}
                className="text-indigo-600 dark:text-indigo-400 p-0"
              >
                {t('activation.editResponse')}
              </Button>
            )}
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
};

ActivationBlock.displayName = "ActivationBlock";
