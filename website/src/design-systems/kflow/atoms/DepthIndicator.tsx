/**
 * DepthIndicator
 *
 * Visual depth meter showing how deep a node is in the knowledge tree (0-11).
 * Thin wrapper over @almadar/ui ProgressBar in stepped mode.
 *
 * entityAware: false
 * eventContract: none
 */

import React from "react";
import { ProgressBar } from "@almadar/ui";

export interface DepthIndicatorProps {
  depth: number;
  maxDepth?: number;
  className?: string;
}

export const DepthIndicator: React.FC<DepthIndicatorProps> = ({
  depth,
  maxDepth = 11,
  className,
}) => {
  return (
    <ProgressBar
      value={depth}
      max={maxDepth}
      progressType="stepped"
      steps={12}
      variant="primary"
      label={`Depth ${depth}`}
      className={className}
    />
  );
};

DepthIndicator.displayName = "DepthIndicator";
