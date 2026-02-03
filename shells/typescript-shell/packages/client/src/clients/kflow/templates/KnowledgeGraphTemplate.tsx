/**
 * KnowledgeGraphTemplate - Template for displaying a knowledge graph with layer navigation
 *
 * Almadar Entity Binding:
 * - Data flows through `entity` prop from Almadar state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:SELECT_NODE - When a graph node is selected
 * - UI:SELECT_LAYER - When a layer is selected
 * - UI:TOGGLE_VIEW - When switching between graph and list view
 */

import React, { useState } from "react";
import { Grid, Network, List as ListIcon } from "lucide-react";
import { Box } from "../../../components/atoms/Box";
import { VStack } from "../../../components/atoms/Stack";
import { HStack } from "../../../components/atoms/Stack";
import { Card } from "../../../components/molecules/Card";
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
import { useEventBus } from "../../../hooks/useEventBus";

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

export interface KnowledgeGraphTemplateProps {
  /** Knowledge graph entity data */
  entity: KnowledgeGraphEntity;
  /** Default view mode */
  defaultView?: "graph" | "list";
  /** Show layer navigator */
  showLayerNav?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom header content */
  headerContent?: React.ReactNode;
}

export const KnowledgeGraphTemplate: React.FC<KnowledgeGraphTemplateProps> = ({
  entity,
  defaultView = "graph",
  showLayerNav = true,
  showLegend = true,
  className = "",
  headerContent,
}) => {
  const { emit } = useEventBus();
  const [viewMode, setViewMode] = useState<"graph" | "list">(defaultView);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeSelect = (node: { id: string }) => {
    setSelectedNodeId(node.id);
    emit("UI:SELECT_NODE", { nodeId: node.id, graphId: entity.id });
  };

  const handleToggleView = (mode: "graph" | "list") => {
    setViewMode(mode);
    emit("UI:TOGGLE_VIEW", { mode, graphId: entity.id });
  };

  // Filter concepts for current layer
  const layerConcepts = entity.concepts?.filter(
    (c) => c.layer === entity.currentLayer,
  );

  // Create legend items from node types
  const legendItems: LegendItem[] = Object.entries(NODE_TYPE_COLORS)
    .map(([type, color]) => ({
      id: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      color,
      count: entity.nodes.filter((n) => n.type === type).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <Box className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <VStack gap="none" className="max-w-7xl mx-auto">
          <HStack justify="between" align="center" className="px-4 py-4">
            <VStack gap="xs">
              <h1 className="text-2xl font-bold text-gray-900">
                {entity.title}
              </h1>
              {entity.description && (
                <p className="text-gray-600">{entity.description}</p>
              )}
            </VStack>

            <HStack gap="md" align="center">
              {/* View toggle */}
              <HStack gap="xs" className="bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleToggleView("graph")}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                    viewMode === "graph"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Network size={16} />
                  Graph
                </button>
                <button
                  onClick={() => handleToggleView("list")}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <ListIcon size={16} />
                  List
                </button>
              </HStack>
              {headerContent}
            </HStack>
          </HStack>

          {/* Layer navigator */}
          {showLayerNav && entity.layers.length > 0 && (
            <Box className="px-4 py-3 border-t border-gray-100">
              <LayerNavigator
                layers={entity.layers}
                currentLayer={entity.currentLayer}
                showCounts
              />
            </Box>
          )}
        </VStack>
      </header>

      {/* Learning goal */}
      {entity.learningGoal && (
        <Box className="max-w-7xl mx-auto px-4 py-4">
          <LearningGoalDisplay
            goal={entity.learningGoal}
            layerNumber={entity.currentLayer}
            graphId={entity.id}
          />
        </Box>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === "graph" ? (
          <HStack gap="lg" align="start">
            {/* Graph */}
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

            {/* Sidebar */}
            <VStack gap="md" className="w-64 flex-shrink-0">
              {/* Legend */}
              {showLegend && legendItems.length > 0 && (
                <GraphLegend
                  title="Node Types"
                  items={legendItems}
                  interactive
                />
              )}

              {/* Selected node info */}
              {selectedNodeId && (
                <Card>
                  <VStack gap="sm">
                    <span className="font-semibold text-gray-900">
                      Selected Concept
                    </span>
                    {(() => {
                      const node = entity.nodes.find(
                        (n) => n.id === selectedNodeId,
                      );
                      if (!node) return null;
                      return (
                        <VStack gap="xs">
                          <span className="text-gray-700">
                            {node.properties.label}
                          </span>
                          {node.type && (
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: `${NODE_TYPE_COLORS[node.type] || NODE_TYPE_COLORS.default}20`,
                                color:
                                  NODE_TYPE_COLORS[node.type] ||
                                  NODE_TYPE_COLORS.default,
                              }}
                            >
                              {node.type}
                            </span>
                          )}
                        </VStack>
                      );
                    })()}
                    <button
                      onClick={() =>
                        emit("UI:VIEW_CONCEPT", { conceptId: selectedNodeId })
                      }
                      className="w-full px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </VStack>
                </Card>
              )}

              {/* Stats */}
              <Card>
                <VStack gap="xs">
                  <span className="font-semibold text-gray-900">
                    Statistics
                  </span>
                  <HStack justify="between">
                    <span className="text-sm text-gray-500">Concepts</span>
                    <span className="text-sm font-medium">
                      {entity.nodes.length}
                    </span>
                  </HStack>
                  <HStack justify="between">
                    <span className="text-sm text-gray-500">Connections</span>
                    <span className="text-sm font-medium">
                      {entity.links.length}
                    </span>
                  </HStack>
                  <HStack justify="between">
                    <span className="text-sm text-gray-500">Layers</span>
                    <span className="text-sm font-medium">
                      {entity.layers.length}
                    </span>
                  </HStack>
                </VStack>
              </Card>
            </VStack>
          </HStack>
        ) : (
          /* List view */
          <VStack gap="md">
            {layerConcepts && layerConcepts.length > 0 ? (
              layerConcepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  entity={concept}
                  operations={[
                    { label: "View", action: "view", variant: "primary" },
                  ]}
                />
              ))
            ) : (
              <Card>
                <VStack gap="md" align="center" className="py-12">
                  <Grid size={48} className="text-gray-300" />
                  <span className="text-gray-500">
                    No concepts in this layer
                  </span>
                </VStack>
              </Card>
            )}
          </VStack>
        )}
      </main>
    </Box>
  );
};

KnowledgeGraphTemplate.displayName = "KnowledgeGraphTemplate";
