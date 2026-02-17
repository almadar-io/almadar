/**
 * CompaniesTemplate - Template for the Companies list page
 *
 * Pure declarative wrapper for CompanyCardGrid organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: CompaniesPage
 * Entity: Company
 * ViewType: list
 *
 * Events Emitted (via CompanyCardGrid):
 * - UI:SEARCH - When the search term changes ({ searchTerm })
 * - UI:CREATE - When "Add Company" is clicked ({ entity: "Company" })
 * - UI:VIEW - When "View" action on a company ({ row, entity: "Company" })
 * - UI:EDIT - When "Edit" action on a company ({ row, entity: "Company" })
 * - UI:NEW_INSPECTION - When "Inspect" action on a company ({ row, entity: "Company" })
 */

import React from "react";
import { CompanyCardGrid } from "../organisms/CompanyCardGrid";
import type { CompanyEntity } from "../organisms/CompanyCardGrid";

export type { CompanyEntity } from "../organisms/CompanyCardGrid";

export interface CompaniesTemplateProps {
  /** Company entity list data */
  entity: readonly CompanyEntity[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show header */
  showHeader?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const CompaniesTemplate: React.FC<CompaniesTemplateProps> = ({
  entity,
  isLoading,
  error,
  title,
  showHeader,
  className,
}) => {
  return (
    <CompanyCardGrid
      entity={entity}
      isLoading={isLoading}
      error={error}
      title={title}
      showHeader={showHeader}
      searchEvent="SEARCH"
      createEvent="CREATE"
      className={className}
    />
  );
};

CompaniesTemplate.displayName = "CompaniesTemplate";
