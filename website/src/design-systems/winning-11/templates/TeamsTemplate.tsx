/**
 * TeamsTemplate
 *
 * Thin wrapper template for the Teams list page (/teams).
 * Delegates all logic to TeamsBoard organism.
 *
 * Page: TeamsPage
 * Entity: Team
 * ViewType: list
 */

import React from "react";
import {
  TeamsBoard,
  type TeamData,
  type TeamsBoardProps,
} from "../organisms/TeamsBoard";

export type { TeamData };

export interface TeamsTemplateProps {
  /** Entity data (team items) */
  entity?: readonly TeamData[];
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
  /** Additional CSS classes */
  className?: string;
}

export const TeamsTemplate: React.FC<TeamsTemplateProps> = (props) => (
  <TeamsBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

TeamsTemplate.displayName = "TeamsTemplate";
