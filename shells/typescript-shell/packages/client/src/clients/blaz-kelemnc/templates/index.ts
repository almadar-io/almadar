// Templates for Blaz Klemenc Fitness Training App
// Page-level layout components that compose atoms, molecules, and organisms

// Export UserData from TraineesTemplate only (canonical source)
export {
  TraineesTemplate,
  type TraineesTemplateProps,
  type UserData,
} from "./TraineesTemplate";

// Export TraineeDetailTemplate without re-exporting UserData (uses TraineesTemplate's UserData)
export {
  TraineeDetailTemplate,
  type TraineeDetailTemplateProps,
  type TraineeStats,
} from "./TraineeDetailTemplate";

// Export TrainingSessionData from SessionsTemplate only (canonical source)
export {
  SessionsTemplate,
  type SessionsTemplateProps,
  type TrainingSessionData,
} from "./SessionsTemplate";

// Export SessionDetailTemplate without re-exporting TrainingSessionData
export {
  SessionDetailTemplate,
  type SessionDetailTemplateProps,
  type ParticipantData,
  type SessionExercise,
} from "./SessionDetailTemplate";

// Export ScheduleTemplate without re-exporting TrainingSessionData
export {
  ScheduleTemplate,
  type ScheduleTemplateProps,
} from "./ScheduleTemplate";

// Other templates
export * from "./MealPlansTemplate";
export * from "./MealPlanDetailTemplate";
export * from "./ProgressTemplate";
export * from "./FitnessTemplate";
export * from "./CreditsTemplate";
