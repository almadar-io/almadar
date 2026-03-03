/* eslint-disable almadar/template-extends-base */
/**
 * TraineeDetailTemplate - Thin wrapper template for TraineeDetailBoard
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Events configured declaratively via event string props
 *
 * Events Emitted (via TraineeDetailBoard):
 * - UI:EDIT - Edit user
 * - UI:DELETE - Delete user
 * - UI:BACK - Navigate back
 * - UI:VIEW_LIFTS - View trainee's lifts
 * - UI:VIEW_SESSIONS - View trainee's sessions
 */

import React from "react";
import {
  TraineeDetailBoard,
  TraineeDetailBoardProps,
  TraineeStats,
  UserEntity,
} from "../organisms/TraineeDetailBoard";

export type { TraineeStats, UserEntity };

export interface TraineeDetailTemplateProps {
  /** User entity data */
  entity: UserEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Additional CSS classes */
  className?: string;
}

export const TraineeDetailTemplate: React.FC<TraineeDetailTemplateProps> = ({
  entity,
  isLoading,
  error,
  className,
}) => (
  <TraineeDetailBoard
    entity={entity}
    isLoading={isLoading}
    error={error}
    className={className}
    editEvent="EDIT"
    deleteEvent="DELETE"
    backEvent="BACK"
    viewLiftsEvent="VIEW_LIFTS"
    viewSessionsEvent="VIEW_SESSIONS"
  />
);

TraineeDetailTemplate.displayName = "TraineeDetailTemplate";
