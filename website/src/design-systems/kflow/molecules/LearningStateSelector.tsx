/**
 * LearningStateSelector — 5-state toggle: unexplored → curious → studying → understood → teaching.
 *
 * Events Emitted:
 * - UI:SET_LEARNING_STATE — When user selects a learning state
 *
 * entityAware: false
 */

import React from "react";
import {
  HStack,
  Button,
  useEventBus,
} from "@almadar/ui";
import { KnowledgeProgressDot } from "../atoms/KnowledgeProgressDot";
import type { LearningStatus } from "../types/knowledge";
import { PROGRESS_STATUS_LABELS } from "../utils/knowledgeConstants";

const STATUSES: LearningStatus[] = [
  "unexplored",
  "curious",
  "studying",
  "understood",
  "teaching",
];

export interface LearningStateSelectorProps {
  currentStatus: LearningStatus;
  nodeId?: string;
  setStateEvent?: string;
  className?: string;
}

export const LearningStateSelector: React.FC<LearningStateSelectorProps> = ({
  currentStatus,
  nodeId,
  setStateEvent,
  className,
}) => {
  const { emit } = useEventBus();

  const handleSelect = (status: LearningStatus) => {
    if (setStateEvent) {
      emit(`UI:${setStateEvent}`, { nodeId, status });
    }
  };

  return (
    <HStack gap="xs" align="center" className={className}>
      {STATUSES.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? "primary" : "ghost"}
          size="sm"
          onClick={() => handleSelect(status)}
        >
          <HStack gap="xs" align="center">
            <KnowledgeProgressDot status={status} size="sm" />
            {PROGRESS_STATUS_LABELS[status]}
          </HStack>
        </Button>
      ))}
    </HStack>
  );
};

LearningStateSelector.displayName = "LearningStateSelector";
