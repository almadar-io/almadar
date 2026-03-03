/**
 * KnowledgeNodeCard — Card showing a concept: title, domain badge, depth, child count, notes preview.
 *
 * Events Emitted:
 * - UI:SELECT_NODE — When the card is clicked
 *
 * entityAware: true
 */

import React from "react";
import {
  Card,
  Typography,
  HStack,
  VStack,
  useEventBus,
} from "@almadar/ui";
import { DomainBadge } from "../atoms/DomainBadge";
import { NodeTypeIcon } from "../atoms/NodeTypeIcon";
import { DepthIndicator } from "../atoms/DepthIndicator";
import type { KnowledgeNode } from "../types/knowledge";

export interface KnowledgeNodeCardProps {
  node: KnowledgeNode;
  selectNodeEvent?: string;
  className?: string;
}

export const KnowledgeNodeCard: React.FC<KnowledgeNodeCardProps> = ({
  node,
  selectNodeEvent,
  className,
}) => {
  const { emit } = useEventBus();

  const handleClick = () => {
    if (selectNodeEvent) emit(`UI:${selectNodeEvent}`, { nodeId: node.id });
  };

  return (
    <Card
      className={className}
      onClick={handleClick}
      variant={selectNodeEvent ? "interactive" : "default"}
    >
      <VStack gap="sm" className="p-3">
        <HStack gap="sm" align="center">
          <NodeTypeIcon nodeType={node.nodeType} size="sm" />
          <Typography variant="label" size="sm" truncate className="flex-1">
            {node.title}
          </Typography>
          <DomainBadge domain={node.domain} size="sm" />
        </HStack>

        {node.description && (
          <Typography variant="body" size="xs" color="muted" overflow="clamp-2">
            {node.description}
          </Typography>
        )}

        <HStack gap="md" align="center">
          <DepthIndicator depth={node.depth} />
          {node.childIds.length > 0 && (
            <Typography variant="body" size="xs" color="muted">
              {node.childIds.length} children
            </Typography>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

KnowledgeNodeCard.displayName = "KnowledgeNodeCard";
