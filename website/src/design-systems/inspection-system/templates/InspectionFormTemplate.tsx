/**
 * InspectionFormDemoTemplate - Template for the config-driven inspection form workflow
 *
 * Pure declarative wrapper for InspectionFormBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: InspectionFormPage
 * Entity: InspectionForm
 * ViewType: form
 *
 * Events Emitted (via InspectionFormBoard):
 * - UI:FIELD_CHANGED - When a form field value changes ({ fieldId, value, tabId })
 * - UI:GLOBAL_VARIABLE_SET - When a global variable is set ({ variable, value, sourceTab })
 * - UI:TAB_CHANGED - When the active tab changes ({ tabId })
 * - UI:PHASE_CHANGED - When the active phase changes ({ phase })
 * - UI:PREVIOUS - When the "Previous" button is clicked ({ fromTab, fromPhase })
 * - UI:NEXT - When the "Next" button is clicked ({ fromTab, fromPhase, completedTab })
 * - UI:COMPLETE - When the form is completed on the last tab ({ completedTabs })
 * - UI:CONTEXT_ACTION - When a context menu action is triggered ({ action, context })
 */

import React from "react";
import { InspectionFormBoard } from "../organisms/InspectionFormBoard";
import type { InspectionFormEntity, DemoPhase } from "../organisms/InspectionFormBoard";

export type {
  InspectionFormEntity,
  DemoPhase,
  FormTabConfig,
  FormSection,
  FormField,
  SExpression,
  ViolationRecord,
  FormState,
  PhaseDefinition,
  MockEntityData,
} from "../organisms/InspectionFormBoard";

export interface InspectionFormDemoTemplateProps {
  /** Inspection form entity data */
  entity: InspectionFormEntity;
  /** Current phase override */
  currentPhase?: DemoPhase;
  /** Current tab override */
  currentTab?: string;
  /** Show debug panel */
  showDebugPanel?: boolean;
  /** Additional class names */
  className?: string;
}

export const InspectionFormDemoTemplate: React.FC<InspectionFormDemoTemplateProps> = ({
  entity,
  currentPhase,
  currentTab,
  showDebugPanel,
  className,
}) => {
  return (
    <InspectionFormBoard
      entity={entity}
      currentPhase={currentPhase}
      currentTab={currentTab}
      showDebugPanel={showDebugPanel}
      fieldChangedEvent="FIELD_CHANGED"
      globalVariableSetEvent="GLOBAL_VARIABLE_SET"
      tabChangedEvent="TAB_CHANGED"
      phaseChangedEvent="PHASE_CHANGED"
      previousEvent="PREVIOUS"
      nextEvent="NEXT"
      completeEvent="COMPLETE"
      contextActionEvent="CONTEXT_ACTION"
      className={className}
    />
  );
};

InspectionFormDemoTemplate.displayName = "InspectionFormDemoTemplate";
