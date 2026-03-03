/**
 * DomainSummaryCard — Summary card for a domain pillar: name, subject count, node count.
 *
 * entityAware: true
 */

import React from "react";
import {
  Card,
  Typography,
  VStack,
  HStack,
} from "@almadar/ui";
import { cn } from "@almadar/ui";
import { DomainBadge } from "../atoms/DomainBadge";
import type { KnowledgeDomain } from "../types/knowledge";
import { DOMAIN_COLORS } from "../utils/knowledgeConstants";

export interface DomainSummaryCardProps {
  domain: KnowledgeDomain;
  className?: string;
}

export const DomainSummaryCard: React.FC<DomainSummaryCardProps> = ({
  domain,
  className,
}) => {
  const colors = DOMAIN_COLORS[domain.domain];

  return (
    <Card className={cn(`border-2 ${colors.border}`, className)} padding="md">
      <VStack gap="sm">
        <HStack gap="sm" align="center">
          <DomainBadge domain={domain.domain} size="md" />
          <Typography variant="label" size="md">
            {domain.name}
          </Typography>
        </HStack>

        {domain.description && (
          <Typography variant="body" size="sm" color="muted">
            {domain.description}
          </Typography>
        )}

        <HStack gap="lg">
          <VStack gap="xs">
            <Typography variant="body" size="xs" color="muted">
              Subjects
            </Typography>
            <Typography variant="label" size="lg">
              {domain.subjectCount}
            </Typography>
          </VStack>
          <VStack gap="xs">
            <Typography variant="body" size="xs" color="muted">
              Nodes
            </Typography>
            <Typography variant="label" size="lg">
              {domain.nodeCount.toLocaleString()}
            </Typography>
          </VStack>
          <VStack gap="xs">
            <Typography variant="body" size="xs" color="muted">
              Max Depth
            </Typography>
            <Typography variant="label" size="lg">
              {domain.maxDepth}
            </Typography>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

DomainSummaryCard.displayName = "DomainSummaryCard";
