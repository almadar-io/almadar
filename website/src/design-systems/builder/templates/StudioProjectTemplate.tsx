/**
 * StudioProjectTemplate - Thin wrapper for project workspace
 *
 * Delegates all logic to StudioProjectBoard organism.
 *
 * Event Contract:
 * - Emits: UI:MODE_CHANGE - When switching between HQ and Build modes
 * - Emits: UI:TAB_CHANGE - When switching tabs within a mode
 * - Emits: UI:SAVE - When saving the project
 * - Emits: UI:VALIDATE - When validating the schema
 * - Emits: UI:COMPILE - When compiling the schema
 * - Emits: UI:PREVIEW - When previewing the app
 * - Emits: UI:BACK - When navigating back to home
 * - Emits: UI:TOGGLE_AGENT - When toggling agent panel
 * - Emits: UI:TOGGLE_INSPECTOR - When toggling inspector panel
 */

import React from "react";
import { StudioProjectBoard } from '../organisms/StudioProjectBoard';

export type {
  StudioMode,
  HQTab,
  BuildTab,
  ProjectInfo,
  ProjectEntity,
} from '../organisms/StudioProjectBoard';

export interface StudioProjectTemplateProps {
  /** Entity containing project data and workspace state — accepts structured entity or entity name string (compiler pattern) */
  entity: import('../organisms/StudioProjectBoard').ProjectEntity | string;

  /** Project data (compiler pattern — passed as binding) */
  project?: unknown;
  /** Current mode (compiler pattern) */
  mode?: string;
  /** Active tab (compiler pattern) */
  activeTab?: string;
  /** Validation result (compiler pattern) */
  validationResult?: unknown;
  /** Is validating flag (compiler pattern) */
  isValidating?: boolean;

  /** Event name for mode change (compiler pattern) */
  onModeChange?: string;
  /** Event name for tab change (compiler pattern) */
  onTabChange?: string;
  /** Event name for save (compiler pattern) */
  onSave?: string;
  /** Event name for validate (compiler pattern) */
  onValidate?: string;
  /** Event name for compile (compiler pattern) */
  onCompile?: string;
  /** Event name for preview (compiler pattern) */
  onPreview?: string;
  /** Event name for back (compiler pattern) */
  onBack?: string;
  /** Event name for toggle agent (compiler pattern) */
  onToggleAgent?: string;
  /** Event name for toggle inspector (compiler pattern) */
  onToggleInspector?: string;

  /** Slot: Schema editor component */
  schemaEditor?: React.ReactNode;
  /** Slot: Orbital visualization component */
  orbitalVisualization?: React.ReactNode;
  /** Slot: History timeline component */
  historyTimeline?: React.ReactNode;
  /** Slot: Design system browser component */
  designSystemBrowser?: React.ReactNode;
  /** Slot: Proposal generator component */
  proposalGenerator?: React.ReactNode;
  /** Slot: AI Agent panel */
  agentPanel?: React.ReactNode;
  /** Slot: Inspector panel */
  inspectorPanel?: React.ReactNode;
  /** Slot: Story view component (rendered in story tab) */
  storyView?: React.ReactNode;
  /** Slot: Flow view component (rendered in flow tab) */
  flowView?: React.ReactNode;
  /** Slot: Glossary component (rendered in glossary tab) */
  glossaryView?: React.ReactNode;
  /** Slot: Validation view component (rendered in validation tab) */
  validationView?: React.ReactNode;
  /** Slot: Domain logic view component (rendered in domain-logic tab) */
  domainLogicView?: React.ReactNode;
  /** Slot: Embedded preview panel for Build mode preview tab */
  previewPanel?: React.ReactNode;
  /** Slot: App sidebar */
  sidebarSlot?: React.ReactNode;
  /** Slot: Modals and overlays */
  modalsSlot?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export const StudioProjectTemplate: React.FC<StudioProjectTemplateProps> = ({
  entity: rawEntity,
  project,
  mode,
  activeTab,
  schemaEditor,
  orbitalVisualization,
  historyTimeline,
  designSystemBrowser,
  proposalGenerator,
  agentPanel,
  inspectorPanel,
  storyView,
  flowView,
  glossaryView,
  validationView,
  domainLogicView,
  previewPanel,
  sidebarSlot,
  modalsSlot,
  className,
  onSave,
  onCompile,
  onTabChange,
  onToggleAgent,
  onToggleInspector,
  onModeChange,
}) => {
  // Normalize entity — compiler passes string entity name, DS expects structured object
  const entity: import('../organisms/StudioProjectBoard').ProjectEntity =
    typeof rawEntity === "string"
      ? {
          project: (project as import('../organisms/StudioProjectBoard').ProjectInfo) || {
            id: "",
            name: "Untitled",
            version: "0.0.0",
            createdAt: "",
            updatedAt: "",
            orbitalsCount: 0,
            traitsCount: 0,
            pagesCount: 0,
          },
          mode: (mode as import('../organisms/StudioProjectBoard').StudioMode) || "hq",
          activeTab: activeTab as import('../organisms/StudioProjectBoard').HQTab | import('../organisms/StudioProjectBoard').BuildTab,
        }
      : rawEntity;

  return (
    <StudioProjectBoard
      entity={entity}
      schemaEditor={schemaEditor}
      orbitalVisualization={orbitalVisualization}
      historyTimeline={historyTimeline}
      designSystemBrowser={designSystemBrowser}
      proposalGenerator={proposalGenerator}
      agentPanel={agentPanel}
      inspectorPanel={inspectorPanel}
      storyView={storyView}
      flowView={flowView}
      glossaryView={glossaryView}
      validationView={validationView}
      domainLogicView={domainLogicView}
      previewPanel={previewPanel}
      sidebarSlot={sidebarSlot}
      modalsSlot={modalsSlot}
      className={className}
      saveEvent={onSave || "SAVE"}
      compileEvent={onCompile || "COMPILE"}
      deployEvent="DEPLOY"
      tabChangeEvent={onTabChange || "TAB_CHANGE"}
      toggleAgentEvent={onToggleAgent || "TOGGLE_AGENT"}
      toggleInspectorEvent={onToggleInspector || "TOGGLE_INSPECTOR"}
      modeChangeEvent={onModeChange || "MODE_CHANGE"}
      runTestsEvent="RUN_TESTS"
    />
  );
};

StudioProjectTemplate.displayName = "StudioProjectTemplate";

export default StudioProjectTemplate;
