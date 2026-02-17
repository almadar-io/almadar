/**
 * TeamMembersTemplate
 *
 * Thin wrapper template for the Team Members page (/teams/:id/members).
 * Delegates all logic to TeamMembersBoard organism.
 *
 * Page: TeamMembersPage
 * Entity: TeamMember
 * ViewType: list
 */

import React from "react";
import {
  TeamMembersBoard,
  type TeamMemberData,
  type TeamMembersBoardProps,
} from "../organisms/TeamMembersBoard";

export type { TeamMemberData };

export interface TeamMembersTemplateProps {
  /** Entity data (team member items) */
  entity?: readonly TeamMemberData[];
  /** Team name for header */
  teamName?: string;
  /** Team ID */
  teamId?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const TeamMembersTemplate: React.FC<TeamMembersTemplateProps> = (props) => (
  <TeamMembersBoard
    {...props}
    addEvent="ADD_MEMBER"
    viewEvent="VIEW"
    removeEvent="REMOVE"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

TeamMembersTemplate.displayName = "TeamMembersTemplate";
