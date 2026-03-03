/* eslint-disable almadar/template-extends-base */
/**
 * InspectorsTemplate - Template for the Inspectors list page
 *
 * Pure declarative wrapper for InspectorCardGrid organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: InspectorsPage
 * Entity: Inspector
 * ViewType: list
 *
 * Events Emitted (via InspectorCardGrid):
 * - UI:SEARCH - When the search term changes ({ searchTerm })
 * - UI:CREATE - When "Add Inspector" is clicked ({ entity: "Inspector" })
 * - UI:VIEW - When "View" action on an inspector ({ row, entity: "Inspector" })
 * - UI:EDIT - When "Edit" action on an inspector ({ row, entity: "Inspector" })
 * - UI:DEACTIVATE - When "Deactivate" action on an active inspector ({ row, entity: "Inspector" })
 */

import React from "react";
import { InspectorCardGrid } from "../organisms/InspectorCardGrid";
import type { InspectorEntity } from "../organisms/InspectorCardGrid";

export type { InspectorEntity } from "../organisms/InspectorCardGrid";

export interface InspectorsTemplateProps {
  /** Inspector entity list data */
  entity: readonly InspectorEntity[];
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

export const InspectorsTemplate: React.FC<InspectorsTemplateProps> = ({
  entity,
  isLoading,
  error,
  title,
  showHeader,
  className,
}) => {
  return (
    <InspectorCardGrid
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

InspectorsTemplate.displayName = "InspectorsTemplate";
