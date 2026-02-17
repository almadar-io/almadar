/**
 * MealPlansTemplate - Thin declarative wrapper for MealPlansBoard organism
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - Event names are bound declaratively to the MealPlansBoard organism
 *
 * Events Emitted (via MealPlansBoard):
 * - UI:CREATE - Create new meal plan
 * - UI:SEARCH - Search meal plans
 * - MealPlanCard handles view/edit/delete events internally
 */

import React from "react";
import {
  MealPlansBoard,
  MealPlanEntity,
  MealPlansBoardProps,
} from "../organisms/MealPlansBoard";
import type { MealPlanData } from "../molecules/MealPlanCard";

export type { MealPlanEntity, MealPlansBoardProps, MealPlanData };

export interface MealPlansTemplateProps {
  /** MealPlan entity data */
  entity: MealPlanEntity;
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

export const MealPlansTemplate: React.FC<MealPlansTemplateProps> = (props) => (
  <MealPlansBoard
    {...props}
    createEvent="CREATE"
    searchEvent="SEARCH"
  />
);

MealPlansTemplate.displayName = "MealPlansTemplate";
