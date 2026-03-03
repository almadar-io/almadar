/* eslint-disable almadar/template-extends-base */
/**
 * GraphIntelligenceTemplate
 *
 * Thin wrapper template for the Graph Intelligence page (/graph-intelligence).
 * Delegates all logic and rendering to GraphIntelligenceBoard organism.
 *
 * Page: GraphIntelligencePage
 * Entity: Cluster
 * ViewType: dashboard
 */

import React from "react";
import {
  GraphIntelligenceBoard,
  type ClusterData,
  type NetworkStats,
  type GraphIntelligenceEntity,
} from "../organisms/GraphIntelligenceBoard";

export type { ClusterData, NetworkStats, GraphIntelligenceEntity };

export interface GraphIntelligenceTemplateProps {
  /** Entity prop */
  entity?: GraphIntelligenceEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

export const GraphIntelligenceTemplate: React.FC<GraphIntelligenceTemplateProps> = (props) => (
  <GraphIntelligenceBoard
    {...props}
    refreshEvent="REFRESH"
    viewClusterEvent="VIEW_CLUSTER"
    viewNodeEvent="VIEW_NODE"
    analyzeEvent="ANALYZE"
  />
);

GraphIntelligenceTemplate.displayName = "GraphIntelligenceTemplate";
