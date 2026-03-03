/* eslint-disable almadar/template-extends-base */
/**
 * SessionsTemplate - Thin declarative wrapper for SessionsBoard organism
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Event names are bound declaratively to the SessionsBoard organism
 *
 * Events Emitted (via SessionsBoard):
 * - UI:CREATE - Create new session
 * - UI:VIEW - View session details
 * - UI:EDIT - Edit session
 * - UI:START - Start a session
 * - UI:COMPLETE - Complete a session
 * - UI:CANCEL - Cancel a session
 * - UI:DELETE - Delete session
 * - UI:SEARCH - Search sessions
 * - UI:FILTER - Filter by status
 */

import React from "react";
import {
  SessionsBoard,
  TrainingSessionData,
  TrainingSessionEntity,
  SessionsBoardProps,
} from "../organisms/SessionsBoard";

export type { TrainingSessionData, TrainingSessionEntity, SessionsBoardProps };

export interface SessionsTemplateProps {
  /** TrainingSession entity data */
  entity: TrainingSessionEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Show filters */
  showFilters?: boolean;
  /** Default status filter */
  defaultStatusFilter?: "all" | "scheduled" | "in-progress" | "completed" | "cancelled";
  /** Additional CSS classes */
  className?: string;
}

export const SessionsTemplate: React.FC<SessionsTemplateProps> = (props) => (
  <SessionsBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    startEvent="START"
    completeEvent="COMPLETE"
    cancelEvent="CANCEL"
    deleteEvent="DELETE"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

SessionsTemplate.displayName = "SessionsTemplate";
