/**
 * KnowledgeProgressDot
 *
 * A colored dot indicating learning progress status for a knowledge node.
 * Five states: unexplored → curious → studying → understood → teaching.
 *
 * entityAware: false
 * eventContract: none
 */

import React from "react";
import { Box } from "@almadar/ui";
import { cn } from "@almadar/ui";
import type { LearningStatus } from "../types/knowledge";
import {
  PROGRESS_STATUS_COLORS,
  PROGRESS_STATUS_LABELS,
} from "../utils/knowledgeConstants";

export interface KnowledgeProgressDotProps {
  status: LearningStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
} as const;

export const KnowledgeProgressDot: React.FC<KnowledgeProgressDotProps> = ({
  status,
  size = "md",
  className,
}) => {
  return (
    <Box
      className={cn(
        "rounded-full inline-block",
        sizeClasses[size],
        PROGRESS_STATUS_COLORS[status],
        className,
      )}
      title={PROGRESS_STATUS_LABELS[status]}
      role="status"
      aria-label={PROGRESS_STATUS_LABELS[status]}
    />
  );
};

KnowledgeProgressDot.displayName = "KnowledgeProgressDot";
