/* eslint-disable almadar/organism-extends-entity-display */
/**
 * SubjectOverviewBoard Organism
 *
 * Subject landing page: stats, concept tree, top concepts by depth, resource list.
 * Three tabs: Tree | List | Resources
 *
 * Events Emitted:
 * - UI:SELECT_NODE — When a concept node is clicked
 * - UI:SELECT_RESOURCE — When a resource link is clicked
 * - UI:NAVIGATE_BREADCRUMB — When a breadcrumb segment is clicked
 * - UI:SET_LEARNING_STATE — When learning state changes
 */

import React, { useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Container,
  Typography,
  Tabs,
  SimpleGrid,
  EmptyState,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
} from "@almadar/ui";
import { TreePine, ExternalLink, BookOpen } from "lucide-react";
import type { KnowledgeNode, KnowledgeSubject } from "../types/knowledge";
import { BreadcrumbTrail } from "../molecules/BreadcrumbTrail";
import type { BreadcrumbSegment } from "../molecules/BreadcrumbTrail";
import { KnowledgeNodeCard } from "../molecules/KnowledgeNodeCard";
import { ResourceLink } from "../molecules/ResourceLink";
import { DepthLegend } from "../molecules/DepthLegend";
import { DomainBadge } from "../atoms/DomainBadge";
import { DepthIndicator } from "../atoms/DepthIndicator";
import { DOMAIN_LABELS } from "../utils/knowledgeConstants";

export interface SubjectOverviewEntity {
  subject: KnowledgeSubject;
  nodes: KnowledgeNode[];
  rootNode: KnowledgeNode;
}

export interface SubjectOverviewBoardProps {
  entity: SubjectOverviewEntity;
  selectNodeEvent?: string;
  navigateBreadcrumbEvent?: string;
  className?: string;
}

export function SubjectOverviewBoard({
  entity,
  selectNodeEvent,
  navigateBreadcrumbEvent,
  className = "",
}: SubjectOverviewBoardProps): React.JSX.Element {
  const { subject, nodes, rootNode } = entity;
  const { t } = useTranslate();

  const breadcrumbs: BreadcrumbSegment[] = useMemo(() => [
    { label: DOMAIN_LABELS[subject.domain], type: "domain", id: subject.domain },
    { label: subject.discipline, type: "discipline", id: subject.discipline },
    { label: subject.name, type: "subject", id: subject.id },
  ], [subject]);

  const nodesByDepth = useMemo(() => {
    const grouped = new Map<number, KnowledgeNode[]>();
    for (const node of nodes) {
      const existing = grouped.get(node.depth) ?? [];
      existing.push(node);
      grouped.set(node.depth, existing);
    }
    return grouped;
  }, [nodes]);

  const allResources = useMemo(() => {
    const urls: Array<{ url: string; nodeTitle: string }> = [];
    for (const node of nodes) {
      for (const url of node.resourceUrls) {
        urls.push({ url, nodeTitle: node.title });
      }
    }
    return urls;
  }, [nodes]);

  const conceptNodes = useMemo(
    () => nodes.filter((n) => n.nodeType === "concept"),
    [nodes],
  );

  const topLevelNodes = useMemo(
    () => nodes.filter((n) => n.parentId === rootNode.id),
    [nodes, rootNode.id],
  );

  const tabItems = [
    {
      id: "tree",
      label: t('subject.tree'),
      icon: TreePine,
      content: (
        <VStack gap="md">
          {rootNode.description && (
            <Section variant="card">
              <Typography variant="body" className="text-sm text-[var(--color-muted-foreground)]">
                {rootNode.description}
              </Typography>
            </Section>
          )}

          <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
            {t('subject.topLevelConcepts', { count: topLevelNodes.length })}
          </Typography>
          <SimpleGrid cols={3} gap="sm">
            {topLevelNodes.map((node) => (
              <KnowledgeNodeCard
                key={node.id}
                node={node}
                selectNodeEvent={selectNodeEvent}
              />
            ))}
          </SimpleGrid>

          <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
            {t('subject.depthDistribution')}
          </Typography>
          <VStack gap="xs">
            {Array.from(nodesByDepth.entries())
              .sort(([a], [b]) => a - b)
              .map(([depth, depthNodes]) => (
                <HStack key={depth} gap="sm" align="center">
                  <DepthIndicator depth={depth} className="w-24" />
                  <Typography variant="small" className="text-xs text-[var(--color-foreground)]">
                    {t('subject.depth', { depth })}
                  </Typography>
                  <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
                    {t('subject.nodeCount', { count: depthNodes.length })}
                  </Typography>
                </HStack>
              ))}
          </VStack>

          <DepthLegend />
        </VStack>
      ),
    },
    {
      id: "list",
      label: t('subject.list'),
      icon: BookOpen,
      content: (
        <VStack gap="sm">
          <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
            {t('subject.allConcepts', { count: conceptNodes.length })}
          </Typography>
          {conceptNodes.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title={t('subject.noConcepts')}
              description={t('subject.noConceptsDesc')}
            />
          ) : (
            conceptNodes.map((node) => (
              <KnowledgeNodeCard
                key={node.id}
                node={node}
                selectNodeEvent={selectNodeEvent}
              />
            ))
          )}
        </VStack>
      ),
    },
    {
      id: "resources",
      label: `${t('subject.resources')} (${allResources.length})`,
      icon: ExternalLink,
      content: (
        <VStack gap="sm">
          {allResources.length === 0 ? (
            <EmptyState
              icon={ExternalLink}
              title={t('subject.noResources')}
              description={t('subject.noResourcesDesc')}
            />
          ) : (
            allResources.map((res, idx) => (
              <ResourceLink
                key={`${res.url}-${idx}`}
                url={res.url}
                title={res.nodeTitle}
                domain={subject.domain}
              />
            ))
          )}
        </VStack>
      ),
    },
  ];

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={subject.name}
        status={{ label: DOMAIN_LABELS[subject.domain], variant: 'info' }}
      >
        <Box className="py-3">
          <BreadcrumbTrail
            segments={breadcrumbs}
            domain={subject.domain}
            navigateEvent={navigateBreadcrumbEvent}
          />
        </Box>
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          <Section variant="card">
            <HStack gap="lg">
              <VStack gap="xs" className="flex-1">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('subject.nodes')}
                </Typography>
                <Typography variant="small" className="text-lg font-medium">{subject.nodeCount.toLocaleString()}</Typography>
              </VStack>
              <VStack gap="xs" className="flex-1">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('subject.maxDepth')}
                </Typography>
                <Typography variant="small" className="text-lg font-medium">{subject.maxDepth}</Typography>
              </VStack>
              <VStack gap="xs" className="flex-1">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('subject.resources')}
                </Typography>
                <Typography variant="small" className="text-lg font-medium">{allResources.length}</Typography>
              </VStack>
              <VStack gap="xs" className="flex-1">
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('subject.fileSize')}
                </Typography>
                <Typography variant="small" className="text-lg font-medium">{Math.round(subject.fileSize / 1024)}KB</Typography>
              </VStack>
            </HStack>
          </Section>

          <Tabs items={tabItems} variant="underline" />
        </VStack>
      </Container>
    </Box>
  );
}

SubjectOverviewBoard.displayName = "SubjectOverviewBoard";
