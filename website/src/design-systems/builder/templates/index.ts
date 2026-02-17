/**
 * Builder Templates
 *
 * Full-page templates for Almadar Studio.
 */

export {
  StudioHomeWebTemplate,
  type StudioHomeWebTemplateProps,
  type StudioHomeWebEntity,
  type Project,
  type ProjectStats,
  type ProjectDomain,
  type SortBy,
} from "./StudioHomeWebTemplate";

export {
  StudioHomeElectronTemplate,
  type StudioHomeElectronTemplateProps,
  type StudioHomeElectronEntity,
  type RecentFile,
} from "./StudioHomeElectronTemplate";

export {
  StudioProjectTemplate,
  type StudioProjectTemplateProps,
  type ProjectEntity,
  type StudioMode,
  type HQTab,
  type BuildTab,
  type ProjectInfo,
} from "./StudioProjectTemplate";

export {
  SettingsTemplate,
  type SettingsTemplateProps,
} from "./SettingsTemplate";

// Domain Logic template
export { DomainLogicView } from "./DomainLogicView";
export type { DomainLogicViewProps } from "./DomainLogicView";

// Validation template
export { ValidationView } from "./ValidationView";
export type { ValidationViewProps } from "./ValidationView";

// Stats template
export {
  StudioStatsTemplate,
  type StudioStatsTemplateProps,
  type StudioStatsEntity,
  type AppStats,
} from "./StudioStatsTemplate";

// AI Builder template
export {
  AIBuilderTemplate,
  type AIBuilderTemplateProps,
  type AIBuilderEntity,
  type AgentStatus as AIBuilderStatus,
} from "./AIBuilderTemplate";
export type { SchemaSummary } from "../molecules/SchemaSummaryCard";

// Preview template
export {
  PreviewTemplate,
  type PreviewTemplateProps,
  type PreviewEntity,
} from "./PreviewTemplate";

// Workspace template
export {
  WorkspaceTemplate,
  type WorkspaceTemplateProps,
  type WorkspaceEntity,
  type WebContainerStatus as WorkspaceContainerStatus,
  type SelectedFile,
  type ToastMessage,
} from "./WorkspaceTemplate";

// Preview Dashboard template
export {
  PreviewDashboardTemplate,
  getIconForPage,
  type PreviewDashboardTemplateProps,
  type PreviewNavItem,
} from "./PreviewDashboardTemplate";

// Validation template (full page)
export {
  ValidationTemplate,
  type ValidationTemplateProps,
  type ValidationEntity,
  type ValidationStage,
  type ValidationError as ValidationTemplateError,
} from "./ValidationTemplate";

// Login template
export {
  LoginTemplate,
  type LoginTemplateProps,
} from "./LoginTemplate";
