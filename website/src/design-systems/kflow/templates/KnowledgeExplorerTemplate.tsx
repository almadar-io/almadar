/**
 * KnowledgeExplorerTemplate - Main entry point for knowledge exploration
 *
 * Pure declarative wrapper for DomainExplorerBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: KnowledgeExplorerPage
 * Entity: KnowledgeDomain[] + KnowledgeSubject[]
 * ViewType: explorer
 *
 * Events Emitted (via DomainExplorerBoard):
 * - UI:SELECT_SUBJECT — When a subject row is clicked
 */

import React from "react";
import { DomainExplorerBoard } from "../organisms/DomainExplorerBoard";
import type { DomainExplorerEntity } from "../organisms/DomainExplorerBoard";

export type { DomainExplorerEntity } from "../organisms/DomainExplorerBoard";

export interface KnowledgeExplorerTemplateProps {
  entity?: DomainExplorerEntity;
  className?: string;
}

export const KnowledgeExplorerTemplate = ({
  entity,
  className,
}: KnowledgeExplorerTemplateProps) => {
  if (!entity) return null;
  return (
    <DomainExplorerBoard
      entity={entity}
      selectSubjectEvent="SELECT_SUBJECT"
      className={className}
    />
  );
};

KnowledgeExplorerTemplate.displayName = "KnowledgeExplorerTemplate";
