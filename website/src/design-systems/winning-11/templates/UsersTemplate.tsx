/* eslint-disable almadar/template-extends-base */
/**
 * UsersTemplate
 *
 * Thin wrapper template for the Users list page (/users).
 * All logic lives in UsersBoard organism.
 *
 * Page: UsersPage
 * Entity: User
 * ViewType: list
 */

import React from "react";
import { UsersBoard } from "../organisms/UsersBoard";

// Re-export types from the organism for public API consumers
export type { UserData } from "../organisms/UsersBoard";

export interface UsersTemplateProps {
  /** Entity prop (user items) */
  entity?: readonly import("../organisms/UsersBoard").UserData[];
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

export const UsersTemplate: React.FC<UsersTemplateProps> = (props) => (
  <UsersBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    searchEvent="SEARCH"
  />
);

UsersTemplate.displayName = "UsersTemplate";
