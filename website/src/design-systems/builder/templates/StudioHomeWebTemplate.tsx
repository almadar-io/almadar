/**
 * StudioHomeWebTemplate - Thin wrapper for web home page
 *
 * Delegates all logic to StudioHomeWebBoard organism.
 *
 * Event Contract:
 * - Emits: UI:CREATE_PROJECT - When creating a new project
 * - Emits: UI:SELECT_PROJECT - When selecting a project
 * - Emits: UI:DELETE_PROJECT - When deleting a project
 * - Emits: UI:OPEN_PROJECT - When opening a project
 * - Emits: UI:PREVIEW_PROJECT - When previewing a project
 * - Emits: UI:SEARCH - When searching projects
 * - Emits: UI:SORT - When sort changes
 */

import React from "react";
import { StudioHomeWebBoard } from '../organisms/StudioHomeWebBoard';

export type { Project, ProjectStats, ProjectDomain, SortBy, StudioHomeWebEntity } from '../organisms/StudioHomeWebBoard';

export interface StudioHomeWebTemplateProps {
  /** Entity containing projects and selection state — accepts structured entity or entity name string (compiler pattern) */
  entity: import('../organisms/StudioHomeWebBoard').StudioHomeWebEntity | string;
  /** AI Agent panel component (slot) */
  agentPanel?: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Event name for creating a project (compiler pattern) */
  onCreateProject?: string;
  /** Event name for selecting a project (compiler pattern) */
  onSelectProject?: string;
  /** Event name for opening a project (compiler pattern) */
  onOpenProject?: string;
  /** Event name for previewing a project (compiler pattern) */
  onPreviewProject?: string;
  /** Event name for deleting a project (compiler pattern) */
  onDeleteProject?: string;
  /** Event name for search (compiler pattern) */
  onSearch?: string;
  /** Event name for sort change (compiler pattern) */
  onSort?: string;
  /** Projects list (compiler pattern - passed as binding) */
  projects?: string | unknown[];
  /** Additional CSS classes */
  className?: string;
}

export const StudioHomeWebTemplate: React.FC<StudioHomeWebTemplateProps> = ({
  entity: rawEntity,
  agentPanel,
  isLoading,
  error,
  className,
  onCreateProject,
  onSelectProject,
  onOpenProject,
  onPreviewProject,
  onDeleteProject,
  onSearch,
  onSort,
}) => {
  // Normalize entity — compiler passes string entity name, DS expects structured object
  const entity: import('../organisms/StudioHomeWebBoard').StudioHomeWebEntity =
    typeof rawEntity === "string"
      ? { projects: [], searchQuery: "" }
      : rawEntity;

  return (
    <StudioHomeWebBoard
      entity={entity}
      agentPanel={agentPanel}
      isLoading={isLoading}
      error={error}
      className={className}
      createProjectEvent={onCreateProject || "CREATE_PROJECT"}
      openProjectEvent={onOpenProject || "OPEN_PROJECT"}
      previewProjectEvent={onPreviewProject || "PREVIEW_PROJECT"}
      deleteProjectEvent={onDeleteProject || "DELETE_PROJECT"}
      searchEvent={onSearch || "SEARCH"}
      sortEvent={onSort || "SORT"}
      importEvent="IMPORT"
    />
  );
};

StudioHomeWebTemplate.displayName = "StudioHomeWebTemplate";

export default StudioHomeWebTemplate;
