/**
 * CrossDomainLink — Shows a connection between two concepts in different domains.
 *
 * entityAware: false
 */

import React from "react";
import {
  HStack,
  Typography,
  Icon,
} from "@almadar/ui";
import { cn } from "@almadar/ui";
import { ArrowRight } from "lucide-react";
import { DomainBadge } from "../atoms/DomainBadge";
import { CrossLinkIndicator } from "../atoms/CrossLinkIndicator";
import type { KnowledgeDomainType } from "../types/knowledge";

export interface CrossDomainLinkProps {
  fromTitle: string;
  fromDomain: KnowledgeDomainType;
  toTitle: string;
  toDomain: KnowledgeDomainType;
  sharedTerm?: string;
  className?: string;
}

export const CrossDomainLink: React.FC<CrossDomainLinkProps> = ({
  fromTitle,
  fromDomain,
  toTitle,
  toDomain,
  sharedTerm,
  className,
}) => {
  return (
    <HStack gap="sm" align="center" className={cn("p-2 rounded", className)}>
      <DomainBadge domain={fromDomain} size="sm" />
      <Typography variant="body" size="sm" truncate>
        {fromTitle}
      </Typography>
      <Icon icon={ArrowRight} size="xs" color="muted" />
      <CrossLinkIndicator targetDomain={toDomain} size="sm" />
      <Typography variant="body" size="sm" truncate>
        {toTitle}
      </Typography>
      <DomainBadge domain={toDomain} size="sm" />
      {sharedTerm && (
        <Typography variant="caption" size="xs" color="muted">
          ({sharedTerm})
        </Typography>
      )}
    </HStack>
  );
};

CrossDomainLink.displayName = "CrossDomainLink";
