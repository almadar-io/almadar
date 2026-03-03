/**
 * ReflectionBlock Molecule Component
 *
 * Post-section reflection prompt that encourages learners to pause
 * and think about what they've learned.
 *
 * Event Contract:
 * - Emits: UI:SAVE_REFLECTION { prompt, note, index, conceptId }
 * - entityAware: true
 */

import React, { useState } from "react";
import { PauseCircle } from "lucide-react";
import {
  Box,
  Button,
  Textarea,
  Typography,
  Icon,
  Card,
  HStack,
  VStack,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface ReflectionBlockProps {
  /** The reflection prompt */
  prompt: string;
  /** Index of this reflection in the lesson */
  index?: number;
  /** Previously saved note (from entity) */
  savedNote?: string;
  /** Concept ID for event payloads */
  conceptId?: string;
  /** Callback when note is saved */
  onSave?: (note: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const ReflectionBlock = ({
  prompt,
  index,
  savedNote,
  conceptId,
  onSave,
  className,
}: ReflectionBlockProps) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [note, setNote] = useState(savedNote || "");
  const [isExpanded, setIsExpanded] = useState(!savedNote);

  const handleSave = () => {
    eventBus.emit("UI:SAVE_REFLECTION", {
      entity: "Concept",
      conceptId,
      prompt,
      note,
      index,
    });
    onSave?.(note);
    setIsExpanded(false);
  };

  return (
    <Card
      className={`bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 ${className || ""}`}
    >
      <Box className="p-5">
        <HStack gap="md" align="start">
          <Icon
            icon={PauseCircle}
            size="md"
            className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1"
          />
          <VStack gap="sm" className="flex-1">
            <Typography
              variant="h4"
              className="font-semibold text-amber-900 dark:text-amber-100"
            >
              {t('reflection.title')}
              {index !== undefined && (
                <span className="text-amber-600 dark:text-amber-400 text-sm font-normal ml-2">
                  #{index + 1}
                </span>
              )}
            </Typography>
            <Typography
              variant="body"
              className="text-[var(--color-foreground)] italic"
            >
              {prompt}
            </Typography>

            {isExpanded ? (
              <VStack gap="md" className="w-full mt-2">
                <Textarea
                  placeholder={t('reflection.placeholder')}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full border-amber-300 dark:border-amber-700 focus:ring-amber-500"
                />
                <HStack gap="sm">
                  <Button variant="primary" onClick={handleSave}>
                    {t('reflection.save')}
                  </Button>
                  <Button variant="ghost" onClick={() => setIsExpanded(false)}>
                    {t('reflection.skip')}
                  </Button>
                </HStack>
              </VStack>
            ) : savedNote ? (
              <VStack gap="sm" className="w-full mt-2">
                <Box className="bg-white/60 dark:bg-gray-800/60 rounded-md p-3 border border-amber-200 dark:border-amber-700">
                  <Typography
                    variant="small"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('reflection.yourReflection')}
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-[var(--color-foreground)] mt-1"
                  >
                    {savedNote}
                  </Typography>
                </Box>
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(true)}
                  className="text-amber-600 dark:text-amber-400 p-0"
                >
                  {t('reflection.edit')}
                </Button>
              </VStack>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="text-amber-600 dark:text-amber-400"
              >
                {t('reflection.addThoughts')}
              </Button>
            )}
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
};

ReflectionBlock.displayName = "ReflectionBlock";
