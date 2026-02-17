/**
 * AssessmentTemplate
 *
 * Thin wrapper template for the Assessment page (/assessment).
 * All logic lives in AssessmentsBoard organism.
 *
 * Page: AssessmentPage
 * Entity: Assessment
 * ViewType: list
 */

import React from "react";
import { AssessmentsBoard } from "../organisms/AssessmentsBoard";

// Re-export types from the organism for public API consumers
export type { AssessmentData } from "../organisms/AssessmentsBoard";

export interface AssessmentTemplateProps {
  /** Entity data (assessment items) */
  entity?: readonly import("../organisms/AssessmentsBoard").AssessmentData[];
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

export const AssessmentTemplate: React.FC<AssessmentTemplateProps> = (props) => (
  <AssessmentsBoard
    {...props}
    createEvent="CREATE"
    viewEvent="VIEW"
    editEvent="EDIT"
    searchEvent="SEARCH"
    filterEvent="FILTER"
  />
);

AssessmentTemplate.displayName = "AssessmentTemplate";
