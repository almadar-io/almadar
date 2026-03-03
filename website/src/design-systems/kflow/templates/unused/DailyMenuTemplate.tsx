/**
 * DailyMenuTemplate - Daily learning menu entry point.
 *
 * Pure declarative wrapper for DailyMenuBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: DailyMenuPage
 * Entity: DailyMenuEntity
 * ViewType: dashboard
 *
 * Events Emitted (via DailyMenuBoard):
 * - UI:CONTINUE_LEARNING
 * - UI:START_REVIEW
 * - UI:OPEN_EXPLORER
 * - UI:OPEN_GRAPH
 * - UI:SELECT_NODE
 * - UI:END_SESSION
 */

import React from "react";
import { DailyMenuBoard } from "../../organisms/DailyMenuBoard";
import type { DailyMenuEntity } from "../../organisms/DailyMenuBoard";

export type { DailyMenuEntity } from "../../organisms/DailyMenuBoard";

export interface DailyMenuTemplateProps {
  entity: DailyMenuEntity;
  className?: string;
}

export const DailyMenuTemplate = ({
  entity,
  className,
}: DailyMenuTemplateProps) => {
  return (
    <DailyMenuBoard
      entity={entity}
      className={className}
    />
  );
};

DailyMenuTemplate.displayName = "DailyMenuTemplate";
