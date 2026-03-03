/**
 * DomainBadge
 *
 * Colored badge indicating a knowledge domain (Formal, Natural, Social).
 * Thin wrapper over @almadar/ui Badge with domain-specific colors.
 *
 * entityAware: false
 * eventContract: none
 */

import React from "react";
import { Badge } from "@almadar/ui";
import { cn } from "@almadar/ui";
import type { KnowledgeDomainType } from "../types/knowledge";
import { DOMAIN_COLORS, DOMAIN_LABELS } from "../utils/knowledgeConstants";

export interface DomainBadgeProps {
  domain: KnowledgeDomainType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const DomainBadge: React.FC<DomainBadgeProps> = ({
  domain,
  size = "sm",
  className,
}) => {
  const colors = DOMAIN_COLORS[domain] ?? DOMAIN_COLORS.formal;
  const label = DOMAIN_LABELS[domain] ?? domain ?? "Unknown";
  return (
    <Badge
      size={size}
      className={cn(colors.bg, colors.text, `border ${colors.border}`, className)}
    >
      {label}
    </Badge>
  );
};

DomainBadge.displayName = "DomainBadge";
