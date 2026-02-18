/**
 * KnowledgeGraphTemplate - Template for displaying a knowledge graph with layer navigation
 *
 * Pure declarative wrapper for KnowledgeGraphBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: KnowledgeGraphPage
 * Entity: KnowledgeGraph
 * ViewType: detail
 *
 * Events Emitted (via KnowledgeGraphBoard):
 * - UI:SELECT_NODE - When a graph node is selected
 * - UI:TOGGLE_VIEW - When switching between graph and list view
 * - UI:VIEW_CONCEPT - When viewing a concept's details
 */

import React from "react";
import { KnowledgeGraphBoard } from "../organisms/KnowledgeGraphBoard";
import type { KnowledgeGraphEntity } from "../organisms/KnowledgeGraphBoard";

export type { KnowledgeGraphEntity } from "../organisms/KnowledgeGraphBoard";

export interface KnowledgeGraphTemplateProps {
  entity: KnowledgeGraphEntity;
  defaultView?: "graph" | "list";
  showLayerNav?: boolean;
  showLegend?: boolean;
  className?: string;
}

export const KnowledgeGraphTemplate: React.FC<KnowledgeGraphTemplateProps> = ({
  entity,
  defaultView,
  showLayerNav,
  showLegend,
  className,
}) => {
  return (
    <KnowledgeGraphBoard
      entity={entity}
      defaultView={defaultView}
      showLayerNav={showLayerNav}
      showLegend={showLegend}
      selectNodeEvent="SELECT_NODE"
      toggleViewEvent="TOGGLE_VIEW"
      viewConceptEvent="VIEW_CONCEPT"
      className={className}
    />
  );
};

KnowledgeGraphTemplate.displayName = "KnowledgeGraphTemplate";
