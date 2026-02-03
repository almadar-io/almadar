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
import { Box } from "../../../../components/atoms/Box";
import { Button } from "../../../../components/atoms/Button";
import { Textarea } from "../../../../components/atoms/Textarea";
import { Typography } from "../../../../components/atoms/Typography";
import { Icon } from "../../../../components/atoms/Icon";
import { VStack } from "../../../../components/atoms/Stack";
import { HStack } from "../../../../components/atoms/Stack";
import { Card } from "../../../../components/atoms/Card";
import { useEventBus } from "../../../../hooks/useEventBus";

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

export const ActivationBlock: React.FC<ActivationBlockProps> = ({
  question,
  savedResponse,
  conceptId,
  onSave,
  className,
}) => {
  const eventBus = useEventBus();
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
              Before You Begin...
            </Typography>
            <Typography
              variant="body"
              className="text-gray-700 dark:text-gray-300"
            >
              {question}
            </Typography>

            {isExpanded ? (
              <VStack gap="md" className="w-full mt-2">
                <Textarea
                  placeholder="Jot down your thoughts..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={3}
                  className="w-full border-indigo-300 dark:border-indigo-700 focus:ring-indigo-500"
                />
                <HStack gap="sm">
                  <Button variant="primary" onClick={handleSubmit}>
                    Continue to Lesson
                  </Button>
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip for now
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(true)}
                className="text-indigo-600 dark:text-indigo-400 p-0"
              >
                Answered - Edit response
              </Button>
            )}
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
};

ActivationBlock.displayName = "ActivationBlock";
