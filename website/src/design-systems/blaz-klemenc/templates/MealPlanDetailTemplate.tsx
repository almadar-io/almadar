/**
 * MealPlanDetailTemplate - Thin wrapper template for MealPlanDetailBoard
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Events configured declaratively via event string props
 *
 * Events Emitted (via MealPlanDetailBoard):
 * - UI:EDIT - Edit meal plan
 * - UI:DELETE - Delete meal plan
 * - UI:ANALYZE - Request AI analysis
 * - UI:SHARE - Share meal plan
 * - UI:BACK - Navigate back
 */

import React from "react";
import {
  MealPlanDetailBoard,
  MealPlanDetailBoardProps,
  MealPlanEntity,
} from "../organisms/MealPlanDetailBoard";

export type { MealPlanEntity };

export interface MealPlanDetailTemplateProps {
  /** MealPlan entity data */
  entity: MealPlanEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** AI analysis loading state */
  isAnalyzing?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const MealPlanDetailTemplate: React.FC<MealPlanDetailTemplateProps> = ({
  entity,
  isLoading,
  error,
  isAnalyzing,
  className,
}) => (
  <MealPlanDetailBoard
    entity={entity}
    isLoading={isLoading}
    error={error}
    isAnalyzing={isAnalyzing}
    className={className}
    editEvent="EDIT"
    deleteEvent="DELETE"
    analyzeEvent="ANALYZE"
    shareEvent="SHARE"
    backEvent="BACK"
  />
);

MealPlanDetailTemplate.displayName = "MealPlanDetailTemplate";
