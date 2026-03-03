/* eslint-disable almadar/template-extends-base */
/**
 * SessionDetailTemplate - Thin wrapper over SessionDetailBoard organism
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Events delegated to SessionDetailBoard with declarative event names
 *
 * Events Emitted (via SessionDetailBoard):
 * - UI:EDIT - Edit session
 * - UI:START - Start session
 * - UI:COMPLETE - Complete session
 * - UI:CANCEL - Cancel session
 * - UI:DELETE - Delete session
 * - UI:BACK - Navigate back
 */

import React from "react";
import {
  SessionDetailBoard,
  type ParticipantData,
  type SessionExercise,
  type TrainingSessionEntity,
} from "../organisms/SessionDetailBoard";

export type { ParticipantData, SessionExercise, TrainingSessionEntity };

export interface SessionDetailTemplateProps {
  /** TrainingSession entity data */
  entity: TrainingSessionEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Additional CSS classes */
  className?: string;
}

export const SessionDetailTemplate: React.FC<SessionDetailTemplateProps> = ({
  entity,
  isLoading,
  error,
  className,
}) => (
  <SessionDetailBoard
    entity={entity}
    isLoading={isLoading}
    error={error}
    className={className}
    editEvent="EDIT"
    startEvent="START"
    completeEvent="COMPLETE"
    cancelEvent="CANCEL"
    deleteEvent="DELETE"
    backEvent="BACK"
  />
);

SessionDetailTemplate.displayName = "SessionDetailTemplate";
