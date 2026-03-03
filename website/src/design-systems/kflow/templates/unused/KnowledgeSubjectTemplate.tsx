/**
 * KnowledgeSubjectTemplate - Template for displaying a knowledge subject overview
 *
 * Pure declarative wrapper for SubjectOverviewBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: KnowledgeSubjectPage
 * Entity: KnowledgeSubject + KnowledgeNode[]
 * ViewType: detail
 *
 * Events Emitted (via SubjectOverviewBoard):
 * - UI:SELECT_NODE — When a concept node is clicked
 * - UI:NAVIGATE_BREADCRUMB — When a breadcrumb segment is clicked
 */

import React from "react";
import { SubjectOverviewBoard } from "../../organisms/SubjectOverviewBoard";
import type { SubjectOverviewEntity } from "../../organisms/SubjectOverviewBoard";

export type { SubjectOverviewEntity } from "../../organisms/SubjectOverviewBoard";

export interface KnowledgeSubjectTemplateProps {
  entity?: SubjectOverviewEntity;
  className?: string;
}

export const KnowledgeSubjectTemplate = ({
  entity,
  className,
}: KnowledgeSubjectTemplateProps) => {
  if (!entity) return null;
  return (
    <SubjectOverviewBoard
      entity={entity}
      selectNodeEvent="SELECT_NODE"
      navigateBreadcrumbEvent="NAVIGATE_BREADCRUMB"
      className={className}
    />
  );
};

KnowledgeSubjectTemplate.displayName = "KnowledgeSubjectTemplate";
