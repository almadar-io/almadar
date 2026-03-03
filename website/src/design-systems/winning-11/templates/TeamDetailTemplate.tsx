/* eslint-disable almadar/template-extends-base */
/**
 * TeamDetailTemplate
 *
 * Thin wrapper template for the Team Detail page (/teams/:id).
 * Delegates all logic and rendering to TeamDetailBoard organism.
 *
 * Page: TeamDetailPage
 * Entity: Team
 * ViewType: detail
 */

import React from "react";
import {
  TeamDetailBoard,
  type TeamDetailData,
  type TeamMemberData,
} from "../organisms/TeamDetailBoard";

export type { TeamDetailData, TeamMemberData };

export interface TeamDetailTemplateProps {
  /** Entity prop (team detail) */
  entity?: TeamDetailData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const TeamDetailTemplate: React.FC<TeamDetailTemplateProps> = (props) => (
  <TeamDetailBoard
    {...props}
    editEvent="EDIT"
    deleteEvent="DELETE"
    backEvent="BACK"
    addMemberEvent="ADD_MEMBER"
    removeMemberEvent="REMOVE_MEMBER"
    viewMemberEvent="VIEW_MEMBER"
    addGoalEvent="ADD_GOAL"
  />
);

TeamDetailTemplate.displayName = "TeamDetailTemplate";
