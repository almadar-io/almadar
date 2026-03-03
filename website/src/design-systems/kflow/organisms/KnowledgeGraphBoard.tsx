/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus, almadar/organism-no-data-state */
/**
 * KnowledgeGraphBoard Organism
 *
 * Knowledge graph with view toggling (graph/list), layer navigation, legend,
 * and node selection. Extracted from KnowledgeGraphTemplate for flattener compliance.
 */

import React, { useState } from "react";
import { Grid, Network, List as ListIcon } from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Card,
  Button,
  Typography,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';
import {
  ForceDirectedGraph,
  GraphNode,
  GraphRelationship,
} from "../organisms/ForceDirectedGraph";
import { ConceptCard, ConceptEntity } from "../organisms/ConceptCard";
import { LayerNavigator, LayerInfo } from "../molecules/LayerNavigator";
import {
  GraphLegend,
  LegendItem,
  NODE_TYPE_COLORS,
} from "../molecules/GraphLegend";
import { LearningGoalDisplay } from "../molecules/LearningGoalDisplay";

export type { GraphNode, GraphRelationship, ConceptEntity, LayerInfo };

export interface KnowledgeGraphEntity {
  id: string;
  title: string;
  description?: string;
  nodes: GraphNode[];
  links: GraphRelationship[];
  layers: LayerInfo[];
  currentLayer: number;
  concepts?: ConceptEntity[];
  learningGoal?: string;
}

export interface KnowledgeGraphBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  entity: KnowledgeGraphEntity;
  defaultView?: "graph" | "list";
  showLayerNav?: boolean;
  showLegend?: boolean;
  selectNodeEvent?: string;
  toggleViewEvent?: string;
  viewConceptEvent?: string;
}

export function KnowledgeGraphBoard({
  entity,
  defaultView = "graph",
  showLayerNav = true,
  showLegend = true,
  selectNodeEvent,
  toggleViewEvent,
  viewConceptEvent,
  className = "",
}: KnowledgeGraphBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [viewMode, setViewMode] = useState<"graph" | "list">(defaultView);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeSelect = (node: { id: string }) => {
    setSelectedNodeId(node.id);
    if (selectNodeEvent) emit(`UI:${selectNodeEvent}`, { nodeId: node.id, graphId: entity.id });
  };

  const handleToggleView = (mode: "graph" | "list") => {
    setViewMode(mode);
    if (toggleViewEvent) emit(`UI:${toggleViewEvent}`, { mode, graphId: entity.id });
  };

  const layerConcepts = entity.concepts?.filter(
    (c) => c.layer === entity.currentLayer,
  );

  const legendItems: LegendItem[] = Object.entries(NODE_TYPE_COLORS)
    .map(([type, color]) => ({
      id: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      color,
      count: entity.nodes.filter((n) => n.type === type).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={entity.title}
        subtitle={entity.description}
      >
        <HStack gap="md" align="center">
          <HStack gap="xs" className="bg-gray-100 rounded-lg p-1">
            <Button
              onClick={() => handleToggleView("graph")}
              variant="secondary"
              size="sm"
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                viewMode === "graph"
                  ? "bg-white text-[var(--color-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <Network size={16} />
              {t('graph.graph')}
            </Button>
            <Button
              onClick={() => handleToggleView("list")}
              variant="secondary"
              size="sm"
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                viewMode === "list"
                  ? "bg-white text-[var(--color-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <ListIcon size={16} />
              {t('graph.list')}
            </Button>
          </HStack>
        </HStack>
      </PageHeader>

      {showLayerNav && entity.layers.length > 0 && (
        <Box className="max-w-7xl mx-auto px-4 py-3 border-b border-gray-100 bg-white">
          <LayerNavigator
            layers={entity.layers}
            currentLayer={entity.currentLayer}
            showCounts
          />
        </Box>
      )}

      {entity.learningGoal && (
        <Box className="max-w-7xl mx-auto px-4 py-4">
          <LearningGoalDisplay
            goal={entity.learningGoal}
            layerNumber={entity.currentLayer}
            graphId={entity.id}
          />
        </Box>
      )}

      <Box className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === "graph" ? (
          <HStack gap="lg" align="start">
            <Box className="flex-1">
              <Card className="overflow-hidden">
                <ForceDirectedGraph
                  graph={{
                    nodes: Object.fromEntries(
                      entity.nodes.map((n) => [n.id, n]),
                    ),
                    relationships: entity.links,
                  }}
                  height={600}
                  onNodeClick={handleNodeSelect}
                />
              </Card>
            </Box>

            <VStack gap="md" className="w-64 flex-shrink-0">
              {showLegend && legendItems.length > 0 && (
                <GraphLegend
                  title={t('graph.nodeTypes')}
                  items={legendItems}
                  interactive
                />
              )}

              {selectedNodeId && (
                <Section title={t('graph.selectedConcept')} variant="card">
                  {(() => {
                    const node = entity.nodes.find(
                      (n) => n.id === selectedNodeId,
                    );
                    if (!node) return null;
                    return (
                      <VStack gap="xs">
                        <Typography variant="small" className="text-[var(--color-foreground)]">
                          {node.properties.label}
                        </Typography>
                        {node.type && (
                          <Typography
                            variant="small"
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${NODE_TYPE_COLORS[node.type] || NODE_TYPE_COLORS.default}20`,
                              color:
                                NODE_TYPE_COLORS[node.type] ||
                                NODE_TYPE_COLORS.default,
                            }}
                          >
                            {node.type}
                          </Typography>
                        )}
                        <Button
                          onClick={() => {
                            if (viewConceptEvent) emit(`UI:${viewConceptEvent}`, { conceptId: selectedNodeId });
                          }}
                          variant="primary"
                          size="sm"
                          className="w-full px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          {t('graph.viewDetails')}
                        </Button>
                      </VStack>
                    );
                  })()}
                </Section>
              )}

              <Section title={t('graph.statistics')} variant="card">
                <VStack gap="xs">
                  <HStack justify="between">
                    <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">{t('graph.concepts')}</Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      {entity.nodes.length}
                    </Typography>
                  </HStack>
                  <HStack justify="between">
                    <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">{t('graph.connections')}</Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      {entity.links.length}
                    </Typography>
                  </HStack>
                  <HStack justify="between">
                    <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">{t('graph.layers')}</Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      {entity.layers.length}
                    </Typography>
                  </HStack>
                </VStack>
              </Section>
            </VStack>
          </HStack>
        ) : (
          <VStack gap="md">
            {layerConcepts && layerConcepts.length > 0 ? (
              layerConcepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  entity={concept}
                  operations={[
                    { label: t('graph.view'), action: "view", variant: "primary" },
                  ]}
                />
              ))
            ) : (
              <Section variant="card">
                <VStack gap="md" align="center" className="py-12">
                  <Grid size={48} className="text-[var(--color-muted-foreground)]" />
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('graph.noConceptsInLayer')}
                  </Typography>
                </VStack>
              </Section>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

KnowledgeGraphBoard.displayName = "KnowledgeGraphBoard";

export default KnowledgeGraphBoard;
