/**
 * CreditsTemplate - Thin wrapper template for the Credits management page
 *
 * Delegates all logic, state, and rendering to CreditsBoard organism.
 * Passes hardcoded event strings for the Orbital closed-circuit pattern.
 *
 * Events Emitted (via CreditsBoard):
 * - UI:CREATE - Add new credits
 * - UI:EDIT - Edit credit entry
 * - UI:ADJUST - Adjust credit balance
 * - UI:DELETE - Remove credits
 * - UI:SEARCH - Search credits
 */

import React from "react";
import { CreditsBoard, CreditEntity } from "../organisms/CreditsBoard";

export type { CreditEntity };

export interface CreditsTemplateProps {
  /** Credit entity data */
  entity: CreditEntity;
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

export const CreditsTemplate: React.FC<CreditsTemplateProps> = (props) => (
  <CreditsBoard
    {...props}
    createEvent="CREATE"
    editEvent="EDIT"
    adjustEvent="ADJUST"
    deleteEvent="DELETE"
    searchEvent="SEARCH"
  />
);

CreditsTemplate.displayName = "CreditsTemplate";
