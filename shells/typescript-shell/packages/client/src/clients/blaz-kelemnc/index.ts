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
 *
 * NOTE: Components are exported individually to avoid circular dependencies.
 * Import directly from the specific file when needed, e.g.:
 *   import { CreditMeter } from "./atoms/CreditMeter";
 */

// Atoms - Basic building blocks (no cross-dependencies)
export * from "./atoms";

// Molecules - Import directly to avoid circular deps with templates
export * from "./molecules";

// Organisms - Import directly to avoid circular deps with templates
export * from "./organisms";

// Templates are NOT re-exported here to avoid circular dependencies.
// Import templates directly from their files:
//   import { TraineesTemplate } from "./templates/TraineesTemplate";
