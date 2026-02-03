/**
 * Blaz Klemenc Fitness Training App Design System
 *
 * A comprehensive design system for fitness trainers managing their trainees.
 * Includes components for:
 * - User/Trainee management
 * - Credit system tracking
 * - Lift and exercise logging
 * - Wellness tracking (sleep, hunger, tiredness)
 * - Progress management (kinesiology exams, special exercises, milestones)
 * - Meal plan creation and AI analysis
 * - Training session scheduling
 *
 * All components follow the Closed Circuit pattern:
 * UI Events → Trait State Machine → Effects → UI Update
 */

// Atoms - Basic building blocks
export * from "./atoms";

// Molecules - Composite components
export * from "./molecules";

// Organisms - Complex feature components
export * from "./organisms";

// Templates - Import directly to avoid type conflicts:
//   import { TraineesTemplate } from "@blaz-kelemnc/templates/TraineesTemplate";
// Or import specific templates:
export {
  TraineesTemplate,
  type TraineesTemplateProps,
} from "./templates/TraineesTemplate";

export {
  TraineeDetailTemplate,
  type TraineeDetailTemplateProps,
  type TraineeStats,
} from "./templates/TraineeDetailTemplate";

export {
  SessionsTemplate,
  type SessionsTemplateProps,
} from "./templates/SessionsTemplate";

export {
  SessionDetailTemplate,
  type SessionDetailTemplateProps,
  type ParticipantData,
  type SessionExercise,
} from "./templates/SessionDetailTemplate";

export {
  ScheduleTemplate,
  type ScheduleTemplateProps,
} from "./templates/ScheduleTemplate";

export {
  MealPlansTemplate,
  type MealPlansTemplateProps,
} from "./templates/MealPlansTemplate";

export {
  MealPlanDetailTemplate,
  type MealPlanDetailTemplateProps,
  type TraineeInfo,
} from "./templates/MealPlanDetailTemplate";

export {
  ProgressTemplate,
  type ProgressTemplateProps,
  type ProgressEntryData,
} from "./templates/ProgressTemplate";

export {
  FitnessTemplate,
  type FitnessTemplateProps,
} from "./templates/FitnessTemplate";

export {
  CreditsTemplate,
  type CreditsTemplateProps,
} from "./templates/CreditsTemplate";
