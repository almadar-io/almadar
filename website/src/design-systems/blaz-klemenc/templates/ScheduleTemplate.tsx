/**
 * ScheduleTemplate - Thin wrapper over ScheduleBoard organism
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Events delegated to ScheduleBoard with declarative event names
 *
 * Events Emitted (via ScheduleBoard):
 * - UI:CREATE - Create new session at time slot
 * - UI:VIEW - View session details
 * - UI:DAY_SELECTED - When a day is selected
 * - UI:WEEK_CHANGE - When week navigation happens
 */

import React from "react";
import {
  ScheduleBoard,
  type TrainingSessionData,
  type ScheduleEntity,
} from "../organisms/ScheduleBoard";

export type { TrainingSessionData, ScheduleEntity };

export interface ScheduleTemplateProps {
  /** TrainingSession entity data */
  entity: ScheduleEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Initial date to show */
  initialDate?: Date;
  /** Additional CSS classes */
  className?: string;
}

export const ScheduleTemplate: React.FC<ScheduleTemplateProps> = ({
  entity,
  isLoading,
  error,
  title,
  initialDate,
  className,
}) => (
  <ScheduleBoard
    entity={entity}
    isLoading={isLoading}
    error={error}
    title={title}
    initialDate={initialDate}
    className={className}
    createEvent="CREATE"
    viewEvent="VIEW"
    daySelectedEvent="DAY_SELECTED"
    weekChangeEvent="WEEK_CHANGE"
  />
);

ScheduleTemplate.displayName = "ScheduleTemplate";
