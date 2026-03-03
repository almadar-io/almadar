/**
 * CrossDomainGraphTemplate - The knowledge fabric, all domains connected.
 *
 * Pure declarative wrapper for CrossDomainGraphBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: CrossDomainGraphPage
 * Entity: KnowledgeNode[] + CrossDomainLink[] + KnowledgeDomain[]
 * ViewType: graph
 *
 * Events Emitted (via CrossDomainGraphBoard):
 * - UI:SELECT_NODE — When a graph node is clicked
 */

import React from "react";
import { CrossDomainGraphBoard } from "../../organisms/CrossDomainGraphBoard";
import type { CrossDomainGraphEntity } from "../../organisms/CrossDomainGraphBoard";

export type { CrossDomainGraphEntity } from "../../organisms/CrossDomainGraphBoard";

export interface CrossDomainGraphTemplateProps {
  entity?: CrossDomainGraphEntity;
  className?: string;
}

export const CrossDomainGraphTemplate = ({
  entity,
  className,
}: CrossDomainGraphTemplateProps) => {
  if (!entity) return null;
  return (
    <CrossDomainGraphBoard
      entity={entity}
      selectNodeEvent="SELECT_NODE"
      className={className}
    />
  );
};

CrossDomainGraphTemplate.displayName = "CrossDomainGraphTemplate";
