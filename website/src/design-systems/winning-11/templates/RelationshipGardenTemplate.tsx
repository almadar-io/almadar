/* eslint-disable almadar/template-extends-base */
/**
 * RelationshipGardenTemplate
 *
 * Thin wrapper template for the Relationship Garden page (/garden).
 * Delegates all logic to RelationshipGardenBoard organism.
 *
 * This is the core visualization for the winning-11 app - the "digital garden"
 * of trust relationships.
 *
 * Page: RelationshipGardenPage
 * Entity: RelationshipHealth
 * ViewType: list
 */

import React from "react";
import {
  RelationshipGardenBoard,
  type RelationshipGardenBoardProps,
} from "../organisms/RelationshipGardenBoard";
import { type GardenItem } from "../organisms/GardenView";
import { type SeasonPhase } from "../atoms/SeasonIndicator";

export interface RelationshipGardenTemplateProps {
  /** Entity prop (garden items) */
  entity?: readonly GardenItem[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Current season */
  season?: SeasonPhase;
  /** Season progress */
  seasonProgress?: number;
  /** Weather condition */
  weatherCondition?: "sunny" | "cloudy" | "rainy" | "stormy";
  /** Weather forecast */
  weatherForecast?: string;
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

export const RelationshipGardenTemplate: React.FC<RelationshipGardenTemplateProps> = (props) => (
  <RelationshipGardenBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    searchEvent="SEARCH"
    filterEvent="FILTER"
    waterEvent="WATER"
  />
);

RelationshipGardenTemplate.displayName = "RelationshipGardenTemplate";
