/* eslint-disable almadar/organism-extends-entity-display */
/**
 * CrossDomainGraphBoard Organism
 *
 * Force-directed graph showing connections between concepts across domains.
 * Nodes colored by domain, edges show shared terms. Clicking a node emits
 * UI:SELECT_NODE. Hover shows tooltip with concept details.
 *
 * Events Emitted:
 * - UI:SELECT_NODE — When a graph node is clicked
 */

import React, { useMemo, useCallback, useRef, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  EmptyState,
  useEventBus,
} from "@almadar/ui";
import ForceGraph2D from "react-force-graph-2d";
import type { KnowledgeNode, KnowledgeDomain, KnowledgeDomainType } from "../types/knowledge";
import { DomainBadge } from "../atoms/DomainBadge";
import { CrossDomainLink } from "../molecules/CrossDomainLink";
import {
  DOMAIN_COLORS,
  CANVAS_TEXT_COLOR,
  CANVAS_LINK_COLOR,
  CANVAS_LINK_SELECTED_COLOR,
} from "../utils/knowledgeConstants";
import { Network } from "lucide-react";

export interface CrossDomainLink {
  sourceId: string;
  targetId: string;
  sharedTerm: string;
}

export interface CrossDomainGraphEntity {
  nodes: KnowledgeNode[];
  links: CrossDomainLink[];
  domains: KnowledgeDomain[];
}

export interface CrossDomainGraphBoardProps {
  entity: CrossDomainGraphEntity;
  width?: number;
  height?: number;
  selectNodeEvent?: string;
  className?: string;
}

interface D3Node {
  id: string;
  name: string;
  domain: KnowledgeDomainType;
  subject: string;
  depth: number;
  x?: number;
  y?: number;
}

interface D3Link {
  source: string | D3Node;
  target: string | D3Node;
  sharedTerm: string;
}

const GRAPH_DEFAULTS = { width: 800, height: 500, cooldownTicks: 100, nodeRadius: 6, rootBonus: 4, fontSize: 4, maxLabelLen: 20 } as const;

export function CrossDomainGraphBoard({
  entity,
  width = GRAPH_DEFAULTS.width,
  height = GRAPH_DEFAULTS.height,
  selectNodeEvent,
  className = "",
}: CrossDomainGraphBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const graphRef = useRef(undefined);
  const [hoveredNode, setHoveredNode] = useState<D3Node | null>(null);
  const [selectedLink, setSelectedLink] = useState<D3Link | null>(null);

  const { nodes, links, domains } = entity;

  const graphData = useMemo(() => {
    const linkedNodeIds = new Set<string>();
    for (const link of links) {
      linkedNodeIds.add(link.sourceId);
      linkedNodeIds.add(link.targetId);
    }

    const nodeMap = new Map<string, KnowledgeNode>();
    for (const node of nodes) {
      nodeMap.set(node.id, node);
    }

    const d3Nodes: D3Node[] = [];
    for (const id of linkedNodeIds) {
      const node = nodeMap.get(id);
      if (node) {
        d3Nodes.push({
          id: node.id,
          name: node.title,
          domain: node.domain,
          subject: node.subject,
          depth: node.depth,
        });
      }
    }

    const d3Links: D3Link[] = links
      .filter((l) => nodeMap.has(l.sourceId) && nodeMap.has(l.targetId))
      .map((l) => ({
        source: l.sourceId,
        target: l.targetId,
        sharedTerm: l.sharedTerm,
      }));

    return { nodes: d3Nodes, links: d3Links };
  }, [nodes, links]);

  const linksByDomainPair = useMemo(() => {
    const pairs = new Map<string, number>();
    const nodeMap = new Map<string, KnowledgeNode>();
    for (const node of nodes) {
      nodeMap.set(node.id, node);
    }
    for (const link of links) {
      const src = nodeMap.get(link.sourceId);
      const tgt = nodeMap.get(link.targetId);
      if (src && tgt) {
        const key = [src.domain, tgt.domain].sort().join("↔");
        pairs.set(key, (pairs.get(key) ?? 0) + 1);
      }
    }
    return pairs;
  }, [nodes, links]);

  const handleNodeClick = useCallback((node: D3Node) => {
    if (selectNodeEvent) {
      emit(`UI:${selectNodeEvent}`, { nodeId: node.id });
    }
  }, [selectNodeEvent, emit]);

  const handleNodeHover = useCallback((node: D3Node | null) => {
    setHoveredNode(node);
  }, []);

  const handleLinkClick = useCallback((link: D3Link) => {
    setSelectedLink(link);
  }, []);

  const nodeCanvasObject = useCallback((node: D3Node, ctx: CanvasRenderingContext2D) => {
    const x = node.x ?? 0;
    const y = node.y ?? 0;
    const radius = GRAPH_DEFAULTS.nodeRadius + (node.depth > 0 ? 0 : GRAPH_DEFAULTS.rootBonus);
    const domainColors = DOMAIN_COLORS[node.domain];

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = hoveredNode?.id === node.id ? domainColors.hexLight : domainColors.hex;
    ctx.fill();
    ctx.strokeStyle = domainColors.hex;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = `${GRAPH_DEFAULTS.fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = CANVAS_TEXT_COLOR;
    const label = node.name.length > GRAPH_DEFAULTS.maxLabelLen
      ? `${node.name.slice(0, GRAPH_DEFAULTS.maxLabelLen - 2)}…`
      : node.name;
    ctx.fillText(label, x, y + radius + 2);
  }, [hoveredNode]);

  const linkCanvasObject = useCallback((link: D3Link, ctx: CanvasRenderingContext2D) => {
    const source = link.source as D3Node;
    const target = link.target as D3Node;
    if (!source.x || !source.y || !target.x || !target.y) return;

    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.strokeStyle = selectedLink === link ? CANVAS_LINK_SELECTED_COLOR : CANVAS_LINK_COLOR;
    ctx.lineWidth = selectedLink === link ? 2 : 0.8;
    ctx.stroke();
  }, [selectedLink]);

  return (
    <VStack gap="md" className={className}>
      <Typography variant="h2" size="xl">
        Cross-Domain Knowledge Graph
      </Typography>
      <Typography variant="body" size="sm" color="muted">
        {graphData.nodes.length} connected concepts, {graphData.links.length} cross-domain links
      </Typography>

      <HStack gap="md" wrap>
        {domains.map((d) => (
          <DomainBadge key={d.id} domain={d.domain} size="md" />
        ))}
        {Array.from(linksByDomainPair.entries()).map(([pair, count]) => (
          <Card key={pair} padding="sm">
            <Typography variant="body" size="xs">
              {pair}: {count} links
            </Typography>
          </Card>
        ))}
      </HStack>

      <Box border rounded="md" overflow="hidden" className={`h-[${height}px]`}>
        {graphData.nodes.length > 0 ? (
          <Box position="relative">
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeCanvasObject={nodeCanvasObject}
              linkCanvasObject={linkCanvasObject}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onLinkClick={handleLinkClick}
              nodeLabel={(node: D3Node) => `${node.name} (${node.subject})`}
              width={width}
              height={height}
              cooldownTicks={GRAPH_DEFAULTS.cooldownTicks}
            />

            {hoveredNode && (
              <Card padding="sm" className="absolute top-2 right-2 max-w-[200px] pointer-events-none">
                <VStack gap="xs">
                  <Typography variant="label" size="sm">
                    {hoveredNode.name}
                  </Typography>
                  <DomainBadge domain={hoveredNode.domain} size="sm" />
                  <Typography variant="body" size="xs" color="muted">
                    {hoveredNode.subject} · depth {hoveredNode.depth}
                  </Typography>
                </VStack>
              </Card>
            )}
          </Box>
        ) : (
          <EmptyState
            icon={Network}
            title="No cross-domain links"
            description="Links are computed from shared concepts between domains."
          />
        )}
      </Box>

      {selectedLink && (
        <Card padding="sm">
          <CrossDomainLink
            fromTitle={(selectedLink.source as D3Node).name}
            fromDomain={(selectedLink.source as D3Node).domain}
            toTitle={(selectedLink.target as D3Node).name}
            toDomain={(selectedLink.target as D3Node).domain}
            sharedTerm={selectedLink.sharedTerm}
          />
        </Card>
      )}
    </VStack>
  );
}

CrossDomainGraphBoard.displayName = "CrossDomainGraphBoard";
