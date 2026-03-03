/* eslint-disable almadar/template-extends-base */
/**
 * InvitesTemplate
 *
 * Thin wrapper template for the Invites page (/invites).
 * All logic lives in InvitesBoard organism.
 *
 * Page: InvitesPage
 * Entity: Invite
 * ViewType: list
 *
 * Events Emitted:
 * - UI:SEARCH - When searching invitations
 * - UI:CREATE - When creating a new invite
 * - UI:COPY_CODE - When copying an invite code
 * - UI:RESEND - When resending an invite
 * - UI:REVOKE - When revoking an invite
 * - UI:VIEW - When viewing an invite
 */

import React from "react";
import { InvitesBoard } from "../organisms/InvitesBoard";

// Re-export types from the organism for public API consumers
export type { InviteData } from "../organisms/InvitesBoard";

export interface InvitesTemplateProps {
  /** Entity prop (invite items) */
  entity?: readonly import("../organisms/InvitesBoard").InviteData[];
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
  /** Additional CSS classes */
  className?: string;
}

export const InvitesTemplate: React.FC<InvitesTemplateProps> = (props) => (
  <InvitesBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    revokeEvent="REVOKE"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

InvitesTemplate.displayName = "InvitesTemplate";
