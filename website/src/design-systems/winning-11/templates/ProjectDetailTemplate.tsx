/**
 * ProjectDetailTemplate
 *
 * Thin wrapper template for the Project Detail page (/projects/:id).
 * Delegates all logic and rendering to ProjectDetailBoard organism.
 *
 * Page: ProjectDetailPage
 * Entity: Project
 * ViewType: detail
 */

import React from "react";
import {
  ProjectDetailBoard,
  type ProjectDetailData,
  type ProjectMember,
} from "../organisms/ProjectDetailBoard";

export type { ProjectDetailData, ProjectMember };

export interface ProjectDetailTemplateProps {
  /** Entity data (project detail) */
  entity?: ProjectDetailData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = (props) => (
  <ProjectDetailBoard
    {...props}
    editEvent="EDIT"
    deleteEvent="DELETE"
    backEvent="BACK"
    addMemberEvent="ADD_MEMBER"
    removeMemberEvent="REMOVE_MEMBER"
    addGoalEvent="ADD_GOAL"
    viewMemberEvent="VIEW_MEMBER"
  />
);

ProjectDetailTemplate.displayName = "ProjectDetailTemplate";
