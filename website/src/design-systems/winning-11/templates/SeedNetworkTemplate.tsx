/* eslint-disable almadar/template-extends-base */
/**
 * SeedNetworkTemplate
 *
 * Thin wrapper template for the Seed Network page (/seed-network).
 * Delegates all logic to SeedNetworkBoard organism.
 *
 * Page: SeedNetworkPage
 * Entity: SeedNomination
 * ViewType: list
 */

import React from "react";
import {
  SeedNetworkBoard,
  type SeedNominationData,
  type SeedNetworkBoardProps,
} from "../organisms/SeedNetworkBoard";

export type { SeedNominationData };

export interface SeedNetworkTemplateProps {
  /** Entity prop (seed nomination items) */
  entity?: readonly SeedNominationData[];
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

export const SeedNetworkTemplate: React.FC<SeedNetworkTemplateProps> = (props) => (
  <SeedNetworkBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    nominateEvent="NOMINATE"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

SeedNetworkTemplate.displayName = "SeedNetworkTemplate";
