/**
 * InspectionsTemplate - Template for the Inspections list page
 *
 * Pure declarative wrapper for InspectionCardGrid organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: InspectionsPage
 * Entity: Inspection
 * ViewType: list
 *
 * Events Emitted (via InspectionCardGrid):
 * - UI:SEARCH - When the search term changes ({ searchTerm })
 * - UI:CREATE - When "New Inspection" is clicked ({ entity: "Inspection" })
 * - UI:VIEW - When "View" action on an inspection ({ row, entity: "Inspection" })
 * - UI:START - When "Start" action on a preparation-phase inspection ({ row, entity: "Inspection" })
 * - UI:CONTINUE - When "Continue" action on an execution-phase inspection ({ row, entity: "Inspection" })
 * - UI:REPORT - When "Report" action on a completed inspection ({ row, entity: "Inspection" })
 */

import React from "react";
import { InspectionCardGrid } from "../organisms/InspectionCardGrid";
import type { InspectionEntity } from "../organisms/InspectionCardGrid";

export type { InspectionEntity } from "../organisms/InspectionCardGrid";

export interface InspectionsTemplateProps {
  /** Inspection entity list data */
  entity: readonly InspectionEntity[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const InspectionsTemplate: React.FC<InspectionsTemplateProps> = ({
  entity,
  isLoading,
  error,
  title,
  showHeader,
  showSearch,
  className,
}) => {
  return (
    <InspectionCardGrid
      entity={entity}
      isLoading={isLoading}
      error={error}
      title={title}
      showHeader={showHeader}
      showSearch={showSearch}
      searchEvent="SEARCH"
      createEvent="CREATE"
      className={className}
    />
  );
};

InspectionsTemplate.displayName = "InspectionsTemplate";
