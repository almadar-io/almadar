/* eslint-disable almadar/template-extends-base */
/**
 * FitnessTemplate - Thin wrapper template for the Fitness/Lift tracking page
 *
 * Delegates all logic, state, and rendering to FitnessBoard organism.
 * Passes hardcoded event strings for the Orbital closed-circuit pattern.
 *
 * Events Emitted (via FitnessBoard):
 * - UI:LOG_LIFT - Log a new lift
 * - UI:VIEW - View lift details
 * - UI:EDIT - Edit lift
 * - UI:DELETE - Delete lift
 * - UI:SEARCH - Search exercises
 */

import React from "react";
import { FitnessBoard, LiftEntity } from "../organisms/FitnessBoard";

export type { LiftEntity };

export interface FitnessTemplateProps {
  /** Lift entity data */
  entity: LiftEntity;
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
  /** Show wellness input */
  showWellnessInput?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const FitnessTemplate: React.FC<FitnessTemplateProps> = (props) => (
  <FitnessBoard
    {...props}
    logLiftEvent="LOG_LIFT"
    viewEvent="VIEW"
    editEvent="EDIT"
    deleteEvent="DELETE"
    searchEvent="SEARCH"
  />
);

FitnessTemplate.displayName = "FitnessTemplate";
