/**
 * TraineesTemplate - Thin wrapper template for the Trainees/Users list page
 *
 * Delegates all logic, state, and rendering to TraineesBoard organism.
 * Passes hardcoded event strings for the Orbital closed-circuit pattern.
 *
 * Events Emitted (via TraineesBoard):
 * - UI:CREATE - Create new user
 * - UI:VIEW - View user details
 * - UI:EDIT - Edit user
 * - UI:DELETE - Delete user
 * - UI:SEARCH - Search users
 * - UI:FILTER - Filter by role
 */

import React from "react";
import { TraineesBoard, UserData, UserEntity } from "../organisms/TraineesBoard";

export type { UserData, UserEntity };

export interface TraineesTemplateProps {
  /** User entity data */
  entity: UserEntity;
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
  /** Default role filter */
  defaultRoleFilter?: "all" | "trainer" | "trainee";
  /** Additional CSS classes */
  className?: string;
}

export const TraineesTemplate: React.FC<TraineesTemplateProps> = (props) => (
  <TraineesBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    deleteEvent="DELETE"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

TraineesTemplate.displayName = "TraineesTemplate";
