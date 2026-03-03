/* eslint-disable almadar/template-extends-base */
/**
 * ProjectsTemplate
 *
 * Thin wrapper template for the Projects list page (/projects).
 * Delegates all logic to ProjectsBoard organism.
 *
 * Page: ProjectsPage
 * Entity: Project
 * ViewType: list
 */

import React from "react";
import {
  ProjectsBoard,
  type ProjectData,
  type ProjectsBoardProps,
} from "../organisms/ProjectsBoard";

export type { ProjectData };

export interface ProjectsTemplateProps {
  /** Entity prop (project items) */
  entity?: readonly ProjectData[];
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

export const ProjectsTemplate: React.FC<ProjectsTemplateProps> = (props) => (
  <ProjectsBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

ProjectsTemplate.displayName = "ProjectsTemplate";
