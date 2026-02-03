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
import { Box } from "../../../../components/atoms/Box";
import { Button } from "../../../../components/atoms/Button";
import { Textarea } from "../../../../components/atoms/Textarea";
import { Typography } from "../../../../components/atoms/Typography";
import { Icon } from "../../../../components/atoms/Icon";
import { Card } from "../../../../components/atoms/Card";
import { HStack, VStack } from "../../../../components/atoms/Stack";
import { useEventBus } from "../../../../hooks/useEventBus";

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

export const ReflectionBlock: React.FC<ReflectionBlockProps> = ({
  prompt,
  index,
  savedNote,
  conceptId,
  onSave,
  className,
}) => {
  const eventBus = useEventBus();
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
              Pause & Reflect
              {index !== undefined && (
                <span className="text-amber-600 dark:text-amber-400 text-sm font-normal ml-2">
                  #{index + 1}
                </span>
              )}
            </Typography>
            <Typography
              variant="body"
              className="text-gray-700 dark:text-gray-300 italic"
            >
              {prompt}
            </Typography>

            {isExpanded ? (
              <VStack gap="md" className="w-full mt-2">
                <Textarea
                  placeholder="Write your thoughts here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full border-amber-300 dark:border-amber-700 focus:ring-amber-500"
                />
                <HStack gap="sm">
                  <Button variant="primary" onClick={handleSave}>
                    Save Reflection
                  </Button>
                  <Button variant="ghost" onClick={() => setIsExpanded(false)}>
                    Skip
                  </Button>
                </HStack>
              </VStack>
            ) : savedNote ? (
              <VStack gap="sm" className="w-full mt-2">
                <Box className="bg-white/60 dark:bg-gray-800/60 rounded-md p-3 border border-amber-200 dark:border-amber-700">
                  <Typography
                    variant="small"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Your reflection:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-gray-800 dark:text-gray-200 mt-1"
                  >
                    {savedNote}
                  </Typography>
                </Box>
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(true)}
                  className="text-amber-600 dark:text-amber-400 p-0"
                >
                  Edit reflection
                </Button>
              </VStack>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="text-amber-600 dark:text-amber-400"
              >
                Add your thoughts
              </Button>
            )}
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
};

ReflectionBlock.displayName = "ReflectionBlock";
