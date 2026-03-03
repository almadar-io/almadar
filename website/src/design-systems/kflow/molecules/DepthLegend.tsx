/**
 * DepthLegend — Legend explaining depth levels: 0=root, 1-3=foundational, 4-7=intermediate, 8-11=deep.
 *
 * entityAware: false
 */

import React from "react";
import {
  VStack,
  HStack,
  Typography,
} from "@almadar/ui";
import { DepthIndicator } from "../atoms/DepthIndicator";

interface DepthRange {
  label: string;
  range: string;
  depth: number;
}

const DEPTH_RANGES: DepthRange[] = [
  { label: "Root", range: "0", depth: 0 },
  { label: "Foundational", range: "1–3", depth: 2 },
  { label: "Intermediate", range: "4–7", depth: 5 },
  { label: "Deep", range: "8–11", depth: 10 },
];

export interface DepthLegendProps {
  className?: string;
}

export const DepthLegend: React.FC<DepthLegendProps> = ({
  className,
}) => {
  return (
    <VStack gap="sm" className={className}>
      <Typography variant="label" size="sm">
        Depth Levels
      </Typography>
      {DEPTH_RANGES.map((range) => (
        <HStack key={range.label} gap="sm" align="center">
          <DepthIndicator depth={range.depth} className="w-24" />
          <Typography variant="body" size="xs">
            {range.range}
          </Typography>
          <Typography variant="body" size="xs" color="muted">
            {range.label}
          </Typography>
        </HStack>
      ))}
    </VStack>
  );
};

DepthLegend.displayName = "DepthLegend";
