export * from "./SessionScheduler";
export * from "./WeeklyCalendar";
export * from "./AIAnalysisPanel";
export * from "./KinesiologyExamForm";
export * from "./TraineeComparison";
export * from "./ScheduleBoard";
export * from "./SessionDetailBoard";
export * from "./FitnessBoard";
export * from "./CreditsBoard";
export * from "./TraineesBoard";
export * from "./ProgressBoard";
export * from "./SessionsBoard";
export * from "./MealPlansBoard";
export * from "./MealPlanDetailBoard";
export * from "./TraineeDetailBoard";

// Resolve duplicate export names across modules by picking canonical sources.
// TrainingSessionData is exported by both ScheduleBoard and SessionsBoard (different shapes).
// Re-export SessionsBoard's version (has createdAt/updatedAt) as the canonical one.
export { type TrainingSessionData } from "./SessionsBoard";
// TrainingSessionEntity is exported by both SessionDetailBoard (single entity) and SessionsBoard (list container).
// Re-export both under disambiguated names for clarity.
export { type TrainingSessionEntity } from "./SessionDetailBoard";
// MealPlanEntity is exported by both MealPlansBoard (list container) and MealPlanDetailBoard (single entity).
export { type MealPlanEntity } from "./MealPlanDetailBoard";
// UserEntity is exported by both TraineesBoard (list container) and TraineeDetailBoard (single entity).
export { type UserEntity } from "./TraineeDetailBoard";
