/**
 * NodeTypeIcon
 *
 * Icon representing a knowledge node type (concept, resource, root).
 * Thin wrapper over @almadar/ui Icon with type-specific Lucide icons.
 *
 * entityAware: false
 * eventContract: none
 */

import React from "react";
import { Icon } from "@almadar/ui";
import type { IconSize } from "@almadar/ui";
import { BookOpen, ExternalLink, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KnowledgeNodeType } from "../types/knowledge";

const NODE_TYPE_ICONS: Record<KnowledgeNodeType, LucideIcon> = {
  concept: BookOpen,
  resource: ExternalLink,
  root: Network,
};

export interface NodeTypeIconProps {
  nodeType: KnowledgeNodeType;
  size?: IconSize;
  className?: string;
}

export const NodeTypeIcon: React.FC<NodeTypeIconProps> = ({
  nodeType,
  size = "md",
  className,
}) => {
  return (
    <Icon
      icon={NODE_TYPE_ICONS[nodeType]}
      size={size}
      className={className}
    />
  );
};

NodeTypeIcon.displayName = "NodeTypeIcon";
