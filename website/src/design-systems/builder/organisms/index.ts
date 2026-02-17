// Agent organisms
export * from "./agent";

// GitHub organisms
export * from "./GitHubIntegration";

// Board organisms (extracted from templates — Phase 6 migration)
export { SettingsBoard } from "./SettingsBoard";
export type { SettingsBoardProps } from "./SettingsBoard";

export { StudioHomeElectronBoard } from "./StudioHomeElectronBoard";
export type { StudioHomeElectronBoardProps, RecentFile, StudioHomeElectronEntity } from "./StudioHomeElectronBoard";

export { StudioHomeWebBoard } from "./StudioHomeWebBoard";
export type { StudioHomeWebBoardProps, StudioHomeWebEntity, Project, ProjectStats, ProjectDomain, SortBy } from "./StudioHomeWebBoard";

export { StudioProjectBoard } from "./StudioProjectBoard";
export type { StudioProjectBoardProps, StudioMode, HQTab, BuildTab, ProjectInfo, ProjectEntity } from "./StudioProjectBoard";

// Visualization organisms
export { default as OrbitalStateMachineView, DomStateMachineVisualizer } from "./OrbitalStateMachineView";
export { default as OrbitalDetailModal, OrbitalVisualizerModal } from "./OrbitalDetailModal";
export { default as OrbitalNetworkView, OrbitalSchemaVisualizer } from "./OrbitalNetworkView";
export type { OrbitalSchemaVisualizerProps } from "./OrbitalNetworkView";
export { OrbitalVisualizationBoard } from "./OrbitalVisualizationBoard";
export type { OrbitalVisualizationBoardProps } from "./OrbitalVisualizationBoard";

// Schema & Domain editing organisms
export { SchemaEditorModal } from "./SchemaEditor";
export type { SchemaEditorModalProps } from "./SchemaEditor";
export { OrbitalViewer as OrbitalViewerBoard } from "./OrbitalViewerBoard";
export { OrbitalHistoryBoard } from "./OrbitalHistoryBoard";
export type { OrbitalHistoryBoardProps, HistoryTimelineItem, RevertResult, ChangeSummary } from "./OrbitalHistoryBoard";

// Domain organisms
export { DomainEditor } from "./domain/DomainEditor";
export { DomainEntitySection } from "./domain/DomainEntitySection";
export { DomainBehaviorSection } from "./domain/DomainBehaviorSection";
export { DomainPageSection } from "./domain/DomainPageSection";

// Sidebar
export { StudioSidebar } from "./StudioSidebar";
export type { StudioSidebarProps, AppSummary } from "./StudioSidebar";

// Builder output organisms
export { ValidationReportBoard } from "./ValidationReportBoard";
export type { ValidationReportBoardProps, ValidationError } from "./ValidationReportBoard";
export { ExpansionSummaryBoard } from "./ExpansionSummaryBoard";
export type { ExpansionSummaryBoardProps, SummarySchema } from "./ExpansionSummaryBoard";

// Workspace organisms (Phase 6)
export { FileTreePanel } from "./FileTreePanel";
export type { FileTreePanelProps, FileNode, FileBadge } from "./FileTreePanel";
export { CodeEditorPanel, getLanguageFromPath } from "./CodeEditorPanel";
export type { CodeEditorPanelProps } from "./CodeEditorPanel";
export { ComponentTreeBoard } from "./ComponentTreeBoard";
export type { ComponentTreeBoardProps } from "./ComponentTreeBoard";
export { BuilderOutputBoard } from "./BuilderOutputBoard";
export type { BuilderOutputBoardProps } from "./BuilderOutputBoard";

// Stats organisms (Phase 7)
export { StatsBoard } from "./StatsBoard";
export type { StatsBoardProps, AppStats } from "./StatsBoard";

// Unified agent panel
export { UnifiedAgentPanel } from "./UnifiedAgentPanel";
export type { UnifiedAgentPanelProps, AgentStatus, AgentActivity, AgentTodo, SchemaDiff, SkillMode } from "./UnifiedAgentPanel";

// Welcome board
export { WelcomeBoard } from "./WelcomeBoard";
export type { WelcomeBoardProps } from "./WelcomeBoard";

// Preview organisms
export * from "./preview";

// Builder organisms (graph editing)
export * from "./builder";
