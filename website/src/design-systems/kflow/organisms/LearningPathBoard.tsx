/* eslint-disable almadar/organism-extends-entity-display */
/**
 * LearningPathBoard Organism
 *
 * AI-suggested learning path through concepts across domains.
 * Shows an ordered sequence of KnowledgeNodes with connections explaining
 * why each step leads to the next, using the @almadar/ui Timeline component.
 *
 * Events Emitted:
 * - UI:SELECT_NODE — When a path node is clicked
 */

import React, { useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Container,
  Timeline,
  EmptyState,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
} from "@almadar/ui";
import type { TimelineItem } from "@almadar/ui";
import { Route } from "lucide-react";
import type { KnowledgeNode, KnowledgeDomainType } from "../types/knowledge";
import { DomainBadge } from "../atoms/DomainBadge";
import { DOMAIN_LABELS } from "../utils/knowledgeConstants";

export interface PathConnection {
  from: string;
  to: string;
  reason: string;
}

export interface LearningPathEntity {
  path: KnowledgeNode[];
  connections: PathConnection[];
  startDomain: KnowledgeDomainType;
  endDomain: KnowledgeDomainType;
}

export interface LearningPathBoardProps {
  entity: LearningPathEntity;
  selectNodeEvent?: string;
  className?: string;
}

/** Map domain to a timeline status for visual variety */
function domainToStatus(domain: KnowledgeDomainType): "complete" | "active" | "pending" {
  switch (domain) {
    case "formal": return "complete";
    case "natural": return "active";
    case "social": return "pending";
  }
}

export function LearningPathBoard({
  entity,
  selectNodeEvent,
  className = "",
}: LearningPathBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const { path, connections, startDomain, endDomain } = entity;

  const reasonMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const conn of connections) {
      map.set(`${conn.from}→${conn.to}`, conn.reason);
    }
    return map;
  }, [connections]);

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const node of path) {
      counts[node.domain] = (counts[node.domain] ?? 0) + 1;
    }
    return counts;
  }, [path]);

  const timelineItems: TimelineItem[] = useMemo(() => {
    return path.map((node, idx) => {
      const prevNode = idx > 0 ? path[idx - 1] : null;
      const reason = prevNode ? reasonMap.get(`${prevNode.id}→${node.id}`) : undefined;

      const description = [
        node.description,
        reason ? `← ${reason}` : undefined,
      ].filter(Boolean).join("\n");

      return {
        id: node.id,
        title: node.title,
        description,
        status: domainToStatus(node.domain),
        tags: [node.subject, t('path.depth', { depth: node.depth })],
      };
    });
  }, [path, reasonMap, t]);

  const handleItemClick = (item: TimelineItem) => {
    if (selectNodeEvent) {
      emit(`UI:${selectNodeEvent}`, { nodeId: item.id });
    }
  };

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={t('path.title')}
        subtitle={t('path.steps', { count: path.length })}
      >
        <HStack gap="sm" align="center">
          <DomainBadge domain={startDomain} size="sm" />
          <Typography variant="small" className="text-[var(--color-muted-foreground)]">→</Typography>
          <DomainBadge domain={endDomain} size="sm" />
        </HStack>
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          <Section variant="card">
            <HStack gap="md" align="center" wrap>
              <VStack gap="xs">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('path.from')}
                </Typography>
                <DomainBadge domain={startDomain} size="md" />
              </VStack>
              <Typography variant="small" className="text-lg text-[var(--color-muted-foreground)]">→</Typography>
              <VStack gap="xs">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('path.to')}
                </Typography>
                <DomainBadge domain={endDomain} size="md" />
              </VStack>
              <VStack gap="xs" className="ml-auto">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('path.stepsLabel')}
                </Typography>
                <Typography variant="small" className="text-lg font-medium">{path.length}</Typography>
              </VStack>
              {Object.entries(domainCounts).map(([domain, count]) => (
                <VStack key={domain} gap="xs">
                  <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                    {DOMAIN_LABELS[domain as KnowledgeDomainType]}
                  </Typography>
                  <Typography variant="small" className="text-lg font-medium">{count}</Typography>
                </VStack>
              ))}
            </HStack>
          </Section>

          {path.length > 0 ? (
            <Timeline
              items={timelineItems}
            />
          ) : (
            <EmptyState
              icon={Route}
              title={t('path.noPath')}
              description={t('path.noPathDesc')}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

LearningPathBoard.displayName = "LearningPathBoard";
