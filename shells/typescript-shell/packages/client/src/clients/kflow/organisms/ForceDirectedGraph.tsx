/**
 * ForceDirectedGraph Organism Component
 *
 * Force-directed graph visualization using react-force-graph-2d.
 * Displays knowledge graphs with nodes colored by type.
 *
 * Event Contract:
 * - Emits: UI:SELECT_NODE { nodeId, nodeType, data }
 * - Emits: UI:HOVER_NODE { nodeId, nodeType }
 * - entityAware: true
 */

import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Box } from "../../../components/atoms/Box";
import { Typography } from "../../../components/atoms/Typography";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Card } from "../../../components/atoms/Card";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";

// Graph data types
export interface GraphNode {
  id: string;
  type: string;
  properties: Record<string, any>;
}

export interface GraphRelationship {
  source: string;
  target: string;
  type: string;
  strength?: number;
  direction?: string;
}

export interface KnowledgeGraph {
  nodes: Record<string, GraphNode>;
  relationships: GraphRelationship[];
  seedConceptId?: string;
}

// D3 node format
interface D3Node {
  id: string;
  name: string;
  type: string;
  layer?: number;
  isSeed?: boolean;
  description?: string;
  [key: string]: any;
}

interface D3Link {
  source: string | D3Node;
  target: string | D3Node;
  type: string;
  strength?: number;
  [key: string]: any;
}

/**
 * Node type color mapping
 */
export const NODE_TYPE_COLORS: Record<
  string,
  { color: string; label: string }
> = {
  Concept: { color: "#3b82f6", label: "Concept" },
  SeedConcept: { color: "#8b5cf6", label: "Seed Concept" },
  Layer: { color: "#10b981", label: "Layer" },
  LearningGoal: { color: "#f59e0b", label: "Learning Goal" },
  Milestone: { color: "#ec4899", label: "Milestone" },
  Lesson: { color: "#06b6d4", label: "Lesson" },
  PracticeExercise: { color: "#84cc16", label: "Practice Exercise" },
  FlashCard: { color: "#a855f7", label: "Flash Card" },
  Metadata: { color: "#64748b", label: "Metadata" },
  Graph: { color: "#1e293b", label: "Graph" },
  Other: { color: "#6b7280", label: "Other" },
};

/**
 * Convert KnowledgeGraph to D3.js format
 */
function convertGraphToD3Format(graph: KnowledgeGraph): {
  nodes: D3Node[];
  links: D3Link[];
} {
  const nodes: D3Node[] = [];
  const links: D3Link[] = [];
  const nodeMap = new Map<string, D3Node>();

  for (const node of Object.values(graph.nodes)) {
    const d3Node: D3Node = {
      id: node.id,
      name: node.properties.name || node.id,
      type: node.type,
      layer: node.properties.layer,
      isSeed: node.properties.isSeed || node.id === graph.seedConceptId,
      description: node.properties.description,
      ...node.properties,
    };
    nodes.push(d3Node);
    nodeMap.set(node.id, d3Node);
  }

  for (const rel of graph.relationships) {
    const sourceNode = nodeMap.get(rel.source);
    const targetNode = nodeMap.get(rel.target);

    if (sourceNode && targetNode) {
      links.push({
        source: sourceNode.id,
        target: targetNode.id,
        type: rel.type,
        strength: rel.strength || 1.0,
      });
    }
  }

  return { nodes, links };
}

/**
 * Get color for node based on type
 */
function getNodeColor(node: D3Node): string {
  if (node.isSeed) return "#8b5cf6";

  switch (node.type) {
    case "Concept":
      if (node.layer !== undefined && node.layer > 0) {
        const colors = [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
        ];
        return colors[(node.layer - 1) % colors.length];
      }
      return "#3b82f6";
    case "Layer":
      return "#10b981";
    case "LearningGoal":
      return "#f59e0b";
    case "Milestone":
      return "#ec4899";
    case "Lesson":
      return "#06b6d4";
    case "PracticeExercise":
      return "#84cc16";
    case "FlashCard":
      return "#a855f7";
    default:
      return "#6b7280";
  }
}

/**
 * Get color for link based on relationship type
 */
function getLinkColor(link: D3Link): string {
  switch (link.type) {
    case "hasParent":
    case "hasChild":
      return "#3b82f6";
    case "hasPrerequisite":
    case "isPrerequisiteOf":
      return "#ef4444";
    case "belongsToLayer":
    case "containsConcept":
      return "#10b981";
    case "hasLearningGoal":
    case "belongsToGoal":
      return "#f59e0b";
    case "hasMilestone":
      return "#ec4899";
    case "hasLesson":
      return "#06b6d4";
    default:
      return "#9ca3af";
  }
}

export interface ForceDirectedGraphProps {
  /** The knowledge graph data */
  graph?: KnowledgeGraph | null;
  /** Width of the graph container */
  width?: number;
  /** Height of the graph container */
  height?: number;
  /** Show node labels */
  showLabels?: boolean;
  /** Show the legend */
  showLegend?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Custom node color function */
  nodeColorFn?: (node: D3Node) => string;
  /** Custom link color function */
  linkColorFn?: (link: D3Link) => string;
  /** Callback when node is clicked */
  onNodeClick?: (node: D3Node) => void;
  /** Additional CSS classes */
  className?: string;
  // Entity-aware props (for schema compatibility)
  /** Entity type */
  entity?: string;
  /** Data array */
  data?: unknown[];
  /** Show layer navigator */
  showLayerNavigator?: boolean;
  /** Fields to display */
  displayFields?: string[];
  /** Item actions */
  itemActions?: Array<{
    label: string;
    event: string;
    onClick?: (row: Record<string, unknown>) => void;
  }>;
}

export const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({
  graph,
  width,
  height,
  showLabels = true,
  showLegend = true,
  isLoading = false,
  nodeColorFn,
  linkColorFn,
  onNodeClick,
  className,
}) => {
  const eventBus = useEventBus();
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<D3Node | null>(null);
  const [dimensions, setDimensions] = useState({
    width: width || 800,
    height: height || 600,
  });

  // Convert graph to D3 format
  const { nodes, links } = useMemo(() => {
    if (!graph) return { nodes: [], links: [] };
    return convertGraphToD3Format(graph);
  }, [graph]);

  // Get connected node IDs for hovered node
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const connected = new Set<string>([hoveredNode.id]);
    links.forEach((link) => {
      const sourceId =
        typeof link.source === "string" ? link.source : link.source.id;
      const targetId =
        typeof link.target === "string" ? link.target : link.target.id;
      if (sourceId === hoveredNode.id) connected.add(targetId);
      else if (targetId === hoveredNode.id) connected.add(sourceId);
    });
    return connected;
  }, [hoveredNode, links]);

  // Handle node click
  const handleNodeClick = useCallback(
    (node: D3Node) => {
      eventBus.emit("UI:SELECT_NODE", {
        entity: node.type,
        nodeId: node.id,
        nodeType: node.type,
        data: node,
      });
      onNodeClick?.(node);
    },
    [eventBus, onNodeClick],
  );

  // Handle node hover
  const handleNodeHover = useCallback(
    (node: D3Node | null) => {
      setHoveredNode(node);
      if (node) {
        eventBus.emit("UI:HOVER_NODE", {
          nodeId: node.id,
          nodeType: node.type,
        });
      }
    },
    [eventBus],
  );

  // Auto-fit to container
  useEffect(() => {
    if (width && height) {
      return;
    }

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 800,
          height: containerRef.current.clientHeight || 600,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width, height]);

  // Loading state
  if (isLoading) {
    return (
      <Box
        className={`w-full h-full flex items-center justify-center ${className || ""}`}
      >
        <VStack gap="md" align="center">
          <Spinner size="lg" />
          <Typography variant="body" className="text-gray-500">
            Loading graph...
          </Typography>
        </VStack>
      </Box>
    );
  }

  // Empty state
  if (!graph || nodes.length === 0) {
    return (
      <Box
        className={`w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg ${className || ""}`}
      >
        <Typography variant="body" className="text-gray-500 dark:text-gray-400">
          No graph data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      className={`w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 relative ${className || ""}`}
    >
      {/* Legend */}
      {showLegend && (
        <Card className="absolute top-4 right-4 z-10 max-w-xs">
          <Box className="p-4">
            <Typography variant="h4" className="mb-3">
              Node Types
            </Typography>
            <VStack gap="xs">
              {Object.entries(NODE_TYPE_COLORS)
                .filter(([key]) =>
                  [
                    "SeedConcept",
                    "Concept",
                    "Layer",
                    "LearningGoal",
                    "Milestone",
                    "Lesson",
                  ].includes(key),
                )
                .map(([key, { color, label }]) => (
                  <HStack key={key} gap="sm" align="center">
                    <Box
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <Typography
                      variant="small"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {label}
                    </Typography>
                  </HStack>
                ))}
            </VStack>
            <Box className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Typography
                variant="small"
                className="text-gray-500 dark:text-gray-400"
              >
                Hover over a node to highlight connections
              </Typography>
            </Box>
          </Box>
        </Card>
      )}

      <ForceGraph2D
        ref={graphRef}
        graphData={{ nodes, links }}
        nodeId="id"
        nodeLabel={(node: any) => `${node.name || node.id}\n${node.type}`}
        nodeColor={(node: any) => {
          const baseColor = nodeColorFn
            ? nodeColorFn(node)
            : getNodeColor(node);
          if (hoveredNode) {
            if (connectedNodeIds.has(node.id)) return baseColor;
            return baseColor + "40";
          }
          return baseColor;
        }}
        nodeVal={(node: any) => {
          const baseSize = node.isSeed ? 12 : node.type === "Layer" ? 10 : 6;
          return hoveredNode?.id === node.id ? baseSize * 1.5 : baseSize;
        }}
        linkColor={(link: any) => {
          const baseColor = linkColorFn
            ? linkColorFn(link)
            : getLinkColor(link);
          if (hoveredNode) {
            const sourceId =
              typeof link.source === "string" ? link.source : link.source.id;
            const targetId =
              typeof link.target === "string" ? link.target : link.target.id;
            if (sourceId === hoveredNode.id || targetId === hoveredNode.id)
              return baseColor;
            return baseColor + "20";
          }
          return baseColor;
        }}
        linkWidth={(link: any) => (link.strength || 1.0) * 2}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.1}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={() => setHoveredNode(null)}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(
          node: any,
          ctx: CanvasRenderingContext2D,
          globalScale: number,
        ) => {
          const color = nodeColorFn ? nodeColorFn(node) : getNodeColor(node);
          const baseSize = node.isSeed ? 12 : node.type === "Layer" ? 10 : 6;
          const nodeSize =
            hoveredNode?.id === node.id ? baseSize * 1.5 : baseSize;
          const isHovered = hoveredNode?.id === node.id;

          // Draw node
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI);
          ctx.fill();

          if (isHovered) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 3 / globalScale;
            ctx.stroke();
          }

          // Draw label
          if (showLabels && globalScale >= 0.5) {
            const label = node.name || node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#374151";
            ctx.fillText(label, node.x || 0, (node.y || 0) + nodeSize + 12);
          }
        }}
        cooldownTicks={100}
        onEngineStop={() => graphRef.current?.zoomToFit?.(400)}
        width={dimensions.width}
        height={dimensions.height}
      />
    </Box>
  );
};

ForceDirectedGraph.displayName = "ForceDirectedGraph";

export default ForceDirectedGraph;
