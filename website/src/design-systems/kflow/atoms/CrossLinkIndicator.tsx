/**
 * CrossLinkIndicator
 *
 * A pulsing dot indicating a cross-domain connection to the target domain.
 * Uses the target domain's color with a CSS pulse animation.
 *
 * entityAware: false
 * eventContract: none
 */

import React from "react";
import { Box } from "@almadar/ui";
import { cn } from "@almadar/ui";
import type { KnowledgeDomainType } from "../types/knowledge";
import { DOMAIN_COLORS, DOMAIN_LABELS } from "../utils/knowledgeConstants";

export interface CrossLinkIndicatorProps {
  targetDomain: KnowledgeDomainType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
} as const;

export const CrossLinkIndicator: React.FC<CrossLinkIndicatorProps> = ({
  targetDomain,
  size = "md",
  className,
}) => {
  const colors = DOMAIN_COLORS[targetDomain];
  return (
    <Box
      className={cn(
        "rounded-full inline-block animate-pulse",
        sizeClasses[size],
        colors.dot,
        className,
      )}
      title={`Links to ${DOMAIN_LABELS[targetDomain]}`}
      role="status"
      aria-label={`Cross-link to ${DOMAIN_LABELS[targetDomain]} domain`}
    />
  );
};

CrossLinkIndicator.displayName = "CrossLinkIndicator";
