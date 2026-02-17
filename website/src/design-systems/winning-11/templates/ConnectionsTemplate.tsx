/**
 * ConnectionsTemplate
 *
 * Thin wrapper template for the Connections page (/connections).
 * All logic lives in ConnectionsBoard organism.
 *
 * Page: ConnectionsPage
 * Entity: Connection
 * ViewType: list
 */

import React from "react";
import { ConnectionsBoard } from "../organisms/ConnectionsBoard";

// Re-export types from the organism for public API consumers
export type { ConnectionData } from "../organisms/ConnectionsBoard";

export interface ConnectionsTemplateProps {
  /** Entity data (connection items) */
  entity?: readonly import("../organisms/ConnectionsBoard").ConnectionData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Current user ID (to determine incoming vs outgoing) */
  currentUserId?: string;
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

export const ConnectionsTemplate: React.FC<ConnectionsTemplateProps> = (props) => (
  <ConnectionsBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    acceptEvent="ACCEPT"
    rejectEvent="REJECT"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

ConnectionsTemplate.displayName = "ConnectionsTemplate";
