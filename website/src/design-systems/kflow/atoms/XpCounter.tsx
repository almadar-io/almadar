/**
 * XpCounter Atom
 *
 * Displays an XP count with domain-appropriate coloring.
 */

import React from "react";
import { Typography, Box } from "@almadar/ui";
import type { KnowledgeDomainType } from "../types/knowledge";
import { DOMAIN_COLORS } from "../utils/knowledgeConstants";

export interface XpCounterProps {
  xp: number;
  domain?: KnowledgeDomainType;
  label?: string;
  className?: string;
}

export const XpCounter: React.FC<XpCounterProps> = ({
  xp,
  domain,
  label = "XP",
  className,
}) => {
  const colors = domain ? DOMAIN_COLORS[domain] : undefined;
  return (
    <Box
      className={`inline-flex items-center gap-1 ${colors?.bg ?? "bg-gray-100"} ${colors?.text ?? "text-gray-700"} rounded-md px-2 py-0.5 ${className ?? ""}`}
    >
      <Typography variant="label" size="sm" weight="bold">
        {xp.toLocaleString()}
      </Typography>
      <Typography variant="caption" size="xs" color="muted">
        {label}
      </Typography>
    </Box>
  );
};

XpCounter.displayName = "XpCounter";
