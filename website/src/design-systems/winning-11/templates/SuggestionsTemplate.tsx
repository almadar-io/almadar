/* eslint-disable almadar/template-extends-base */
/**
 * SuggestionsTemplate
 *
 * Thin wrapper template for the Suggestions page (/suggestions).
 * Delegates all logic to SuggestionsBoard organism.
 *
 * Page: SuggestionsPage
 * Entity: ConnectionSuggestion
 * ViewType: list
 */

import React from "react";
import {
  SuggestionsBoard,
  type SuggestionData,
  type SuggestionsBoardProps,
} from "../organisms/SuggestionsBoard";

export type { SuggestionData };

export interface SuggestionsTemplateProps {
  /** Entity prop (suggestion items) */
  entity?: readonly SuggestionData[];
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
  /** Additional CSS classes */
  className?: string;
}

export const SuggestionsTemplate: React.FC<SuggestionsTemplateProps> = (props) => (
  <SuggestionsBoard
    {...props}
    viewEvent="VIEW"
    acceptEvent="CONNECT"
    rejectEvent="DISMISS"
    createEvent="REFRESH"
  />
);

SuggestionsTemplate.displayName = "SuggestionsTemplate";
