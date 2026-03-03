/* eslint-disable almadar/organism-extends-entity-display */
/**
 * CrossDomainDiscoveryBoard Organism
 *
 * Shows newly discovered cross-domain connections between knowledge nodes.
 * Each discovery shows the shared term and the linked nodes from different domains.
 *
 * Events Emitted:
 * - UI:SELECT_NODE — When a discovery node is clicked
 */

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Badge,
  Container,
  EmptyState,
  PageHeader,
  useEventBus,
  useTranslate,
} from "@almadar/ui";
import { Sparkles } from "lucide-react";
import type { KnowledgeNode } from "../types/knowledge";
import { CrossDomainLink } from "../molecules/CrossDomainLink";
import { XpCounter } from "../atoms/XpCounter";

export interface Discovery {
  sharedTerm: string;
  nodes: KnowledgeNode[];
  isNew: boolean;
}

export interface CrossDomainDiscoveryEntity {
  discoveries: Discovery[];
  bonusesUnlocked: number;
}

export interface CrossDomainDiscoveryBoardProps {
  entity: CrossDomainDiscoveryEntity;
  className?: string;
}

export function CrossDomainDiscoveryBoard({
  entity,
  className = "",
}: CrossDomainDiscoveryBoardProps): React.JSX.Element {
  const { discoveries, bonusesUnlocked } = entity;
  const { t } = useTranslate();

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={t('discoveries.title')}
      >
        {bonusesUnlocked > 0 && (
          <XpCounter xp={bonusesUnlocked} label={t('discoveries.bonus')} />
        )}
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        {discoveries.length > 0 ? (
          <VStack gap="md">
            {discoveries.map((disc) => (
              <Card key={disc.sharedTerm}>
                <VStack gap="sm">
                  <HStack gap="sm" align="center">
                    <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
                      {disc.sharedTerm}
                    </Typography>
                    {disc.isNew && (
                      <Badge variant="success" size="sm">{t('discoveries.new')}</Badge>
                    )}
                  </HStack>
                  <VStack gap="xs">
                    {disc.nodes.length >= 2 ? (
                      disc.nodes.slice(0, -1).map((node, idx) => {
                        const nextNode = disc.nodes[idx + 1];
                        return (
                          <CrossDomainLink
                            key={`${node.id}-${nextNode.id}`}
                            fromTitle={node.title}
                            fromDomain={node.domain}
                            toTitle={nextNode.title}
                            toDomain={nextNode.domain}
                            sharedTerm={disc.sharedTerm}
                          />
                        );
                      })
                    ) : (
                      disc.nodes.map((node) => (
                        <CrossDomainLink
                          key={node.id}
                          fromTitle={node.title}
                          fromDomain={node.domain}
                          toTitle={node.title}
                          toDomain={node.domain}
                          sharedTerm={disc.sharedTerm}
                        />
                      ))
                    )}
                  </VStack>
                </VStack>
              </Card>
            ))}
          </VStack>
        ) : (
          <EmptyState
            icon={Sparkles}
            title={t('discoveries.noDiscoveries')}
            description={t('discoveries.noDiscoveriesDesc')}
          />
        )}
      </Container>
    </Box>
  );
}

CrossDomainDiscoveryBoard.displayName = "CrossDomainDiscoveryBoard";
