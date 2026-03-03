/**
 * LearningPathTemplate - AI-suggested learning journeys across domains.
 *
 * Pure declarative wrapper for LearningPathBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: LearningPathPage
 * Entity: KnowledgeNode[] path + connections + domain endpoints
 * ViewType: detail
 *
 * Events Emitted (via LearningPathBoard):
 * - UI:SELECT_NODE — When a path node is clicked
 */

import React from "react";
import { LearningPathBoard } from "../organisms/LearningPathBoard";
import type { LearningPathEntity } from "../organisms/LearningPathBoard";

export type { LearningPathEntity } from "../organisms/LearningPathBoard";

export interface LearningPathTemplateProps {
  entity?: LearningPathEntity;
  className?: string;
}

export const LearningPathTemplate = ({
  entity,
  className,
}: LearningPathTemplateProps) => {
  if (!entity) return null;
  return (
    <LearningPathBoard
      entity={entity}
      selectNodeEvent="SELECT_NODE"
      className={className}
    />
  );
};

LearningPathTemplate.displayName = "LearningPathTemplate";
