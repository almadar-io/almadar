/**
 * SpacedReviewTemplate - Spaced repetition review session.
 *
 * Pure declarative wrapper for SpacedReviewBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: SpacedReviewPage
 * Entity: SpacedReviewEntity
 * ViewType: detail
 *
 * Events Emitted (via SpacedReviewBoard):
 * - UI:REVIEW_ANSWER
 * - UI:SKIP_REVIEW
 * - UI:REVIEW_SESSION_COMPLETE
 */

import React from "react";
import { SpacedReviewBoard } from "../../organisms/SpacedReviewBoard";
import type { SpacedReviewEntity } from "../../organisms/SpacedReviewBoard";

export type { SpacedReviewEntity } from "../../organisms/SpacedReviewBoard";

export interface SpacedReviewTemplateProps {
  entity: SpacedReviewEntity;
  className?: string;
}

export const SpacedReviewTemplate = ({
  entity,
  className,
}: SpacedReviewTemplateProps) => {
  return (
    <SpacedReviewBoard
      entity={entity}
      className={className}
    />
  );
};

SpacedReviewTemplate.displayName = "SpacedReviewTemplate";
