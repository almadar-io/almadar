/* eslint-disable almadar/template-extends-base */
/**
 * UserProfileTemplate
 *
 * Thin wrapper template for the User Profile detail page (/users/:id).
 * Delegates all logic and rendering to UserProfileBoard organism.
 *
 * Page: UserProfilePage
 * Entity: User
 * ViewType: detail
 */

import React from "react";
import {
  UserProfileBoard,
  type UserProfileData,
} from "../organisms/UserProfileBoard";

export type { UserProfileData };

export interface UserProfileTemplateProps {
  /** Entity prop (user profile) */
  entity?: UserProfileData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const UserProfileTemplate: React.FC<UserProfileTemplateProps> = (props) => (
  <UserProfileBoard
    {...props}
    editEvent="EDIT"
    backEvent="BACK"
    viewConnectionsEvent="VIEW_CONNECTIONS"
    viewTeamsEvent="VIEW_TEAMS"
    viewInvitesEvent="VIEW_INVITES"
  />
);

UserProfileTemplate.displayName = "UserProfileTemplate";
