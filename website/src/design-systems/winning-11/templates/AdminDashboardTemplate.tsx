/**
 * AdminDashboardTemplate
 *
 * Thin wrapper template for the Admin Dashboard page (/admin).
 * All logic lives in AdminDashboardBoard organism.
 *
 * Page: AdminDashboardPage
 * Entity: Multiple (User, Invite, Connection, etc.)
 * ViewType: dashboard
 */

import React from "react";
import {
  AdminDashboardBoard,
} from "../organisms/AdminDashboardBoard";

// Re-export types from the organism for public API consumers
export type {
  DashboardStats,
  RecentActivity,
  SystemAlert,
  AdminDashboardEntity,
} from "../organisms/AdminDashboardBoard";

export interface AdminDashboardTemplateProps {
  /** Entity data */
  entity?: import("../organisms/AdminDashboardBoard").AdminDashboardEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

export const AdminDashboardTemplate: React.FC<AdminDashboardTemplateProps> = (props) => (
  <AdminDashboardBoard
    {...props}
    refreshEvent="REFRESH"
    navigateEvent="NAVIGATE"
    settingsEvent="SETTINGS"
  />
);

AdminDashboardTemplate.displayName = "AdminDashboardTemplate";
