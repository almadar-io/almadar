/**
 * TrustIntelligenceTemplate
 *
 * Thin wrapper template for the Trust Intelligence dashboard page (/trust-intelligence).
 * Delegates all logic and rendering to TrustIntelligenceBoard organism.
 *
 * Page: TrustIntelligencePage
 * Entity: TrustScore
 * ViewType: dashboard
 */

import React from "react";
import {
  TrustIntelligenceBoard,
  type TrustScoreData,
  type TrustIntelligenceEntity,
} from "../organisms/TrustIntelligenceBoard";

export type { TrustScoreData, TrustIntelligenceEntity };

export interface TrustIntelligenceTemplateProps {
  /** Entity data */
  entity?: TrustIntelligenceEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

export const TrustIntelligenceTemplate: React.FC<TrustIntelligenceTemplateProps> = (props) => (
  <TrustIntelligenceBoard
    {...props}
    refreshEvent="REFRESH"
    calculateEvent="CALCULATE"
    viewUserEvent="VIEW"
    viewDetailsEvent="VIEW_DETAILS"
  />
);

TrustIntelligenceTemplate.displayName = "TrustIntelligenceTemplate";
