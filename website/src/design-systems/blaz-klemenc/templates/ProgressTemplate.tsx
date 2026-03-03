/* eslint-disable almadar/template-extends-base */
/**
 * ProgressTemplate - Thin declarative wrapper for ProgressBoard organism
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Event names are bound declaratively to the ProgressBoard organism
 *
 * Events Emitted (via ProgressBoard):
 * - UI:CREATE_PROGRESS - Create new progress entry
 * - UI:VIEW - View progress entry details
 * - UI:EDIT - Edit progress entry
 * - UI:DELETE - Delete progress entry
 * - UI:SEARCH - Search progress entries
 */

import React from "react";
import {
  ProgressBoard,
  ProgressEntryData,
  ProgressEntryEntity,
  ProgressBoardProps,
} from "../organisms/ProgressBoard";

export type { ProgressEntryData, ProgressEntryEntity, ProgressBoardProps };

export interface ProgressTemplateProps {
  /** ProgressEntry entity data */
  entity: ProgressEntryEntity;
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
  /** Additional CSS classes */
  className?: string;
}

export const ProgressTemplate: React.FC<ProgressTemplateProps> = (props) => (
  <ProgressBoard
    {...props}
    createEvent="CREATE_PROGRESS"
    viewEvent="VIEW"
    editEvent="EDIT"
    deleteEvent="DELETE"
    searchEvent="SEARCH"
  />
);

ProgressTemplate.displayName = "ProgressTemplate";
