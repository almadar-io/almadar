import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DomStateMachineVisualizer } from "./OrbitalStateMachineView";
import {
  renderStateMachineToDomData,
  DEFAULT_CONFIG,
  type StateMachineDefinition,
} from "@almadar/ui/lib";

const meta: Meta<typeof DomStateMachineVisualizer> = {
  title: "Builder/Organisms/OrbitalStateMachineView",
  component: DomStateMachineVisualizer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", backgroundColor: "var(--color-background)", minHeight: "600px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onTransitionClick: fn(),
    onStateClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DomStateMachineVisualizer>;

// =============================================================================
// Helper: build layoutData from a StateMachineDefinition
// =============================================================================

function buildLayout(sm: StateMachineDefinition, title: string) {
  return renderStateMachineToDomData(sm, { title }, DEFAULT_CONFIG);
}

// =============================================================================
// State Machine Definitions
// =============================================================================

const crudStateMachine: StateMachineDefinition = {
  states: [
    { name: "Browsing", isInitial: true },
    { name: "Creating" },
    { name: "Viewing" },
    { name: "Editing" },
  ],
  transitions: [
    { from: "Browsing", to: "Browsing", event: "INIT", effects: ["render-ui main page-header", "render-ui main entity-table"] },
    { from: "Browsing", to: "Creating", event: "CREATE", effects: ["render-ui modal form-section"] },
    { from: "Creating", to: "Browsing", event: "SAVE", effects: ["persist create", "render-ui modal null"] },
    { from: "Creating", to: "Browsing", event: "CANCEL", effects: ["render-ui modal null"] },
    { from: "Browsing", to: "Viewing", event: "VIEW", effects: ["render-ui main entity-detail"] },
    { from: "Viewing", to: "Editing", event: "EDIT", effects: ["render-ui modal form-section"] },
    { from: "Editing", to: "Viewing", event: "SAVE", effects: ["persist update"] },
    { from: "Editing", to: "Viewing", event: "CANCEL", effects: ["render-ui modal null"] },
    { from: "Viewing", to: "Browsing", event: "CANCEL" },
  ],
};

const linearStateMachine: StateMachineDefinition = {
  states: [
    { name: "Step1", isInitial: true },
    { name: "Step2" },
    { name: "Complete" },
  ],
  transitions: [
    { from: "Step1", to: "Step1", event: "INIT" },
    { from: "Step1", to: "Step2", event: "NEXT" },
    { from: "Step2", to: "Complete", event: "FINISH" },
    { from: "Step2", to: "Step1", event: "BACK" },
  ],
};

const guardedStateMachine: StateMachineDefinition = {
  states: [
    { name: "Idle", isInitial: true },
    { name: "Validating" },
    { name: "Processing" },
    { name: "Complete" },
  ],
  transitions: [
    { from: "Idle", to: "Idle", event: "INIT" },
    { from: "Idle", to: "Validating", event: "SUBMIT", guard: "hasRequiredFields" },
    { from: "Validating", to: "Processing", event: "VALID", guard: "isAuthenticated" },
    { from: "Validating", to: "Idle", event: "INVALID" },
    { from: "Processing", to: "Complete", event: "DONE", guard: "paymentConfirmed" },
    { from: "Processing", to: "Idle", event: "FAIL" },
  ],
};

const selfLoopStateMachine: StateMachineDefinition = {
  states: [
    { name: "Dashboard", isInitial: true },
    { name: "FilterActive" },
  ],
  transitions: [
    { from: "Dashboard", to: "Dashboard", event: "INIT", effects: ["render-ui main stats-grid"] },
    { from: "Dashboard", to: "Dashboard", event: "REFRESH", effects: ["fetch-data"] },
    { from: "Dashboard", to: "FilterActive", event: "FILTER" },
    { from: "FilterActive", to: "FilterActive", event: "UPDATE_FILTER" },
    { from: "FilterActive", to: "Dashboard", event: "CLEAR_FILTER" },
  ],
};

const selectedStateStateMachine: StateMachineDefinition = {
  states: [
    { name: "Browsing", isInitial: true },
    { name: "Creating" },
    { name: "Editing" },
    { name: "Deleting" },
  ],
  transitions: [
    { from: "Browsing", to: "Browsing", event: "INIT" },
    { from: "Browsing", to: "Creating", event: "CREATE" },
    { from: "Creating", to: "Browsing", event: "SAVE" },
    { from: "Creating", to: "Browsing", event: "CANCEL" },
    { from: "Browsing", to: "Editing", event: "EDIT" },
    { from: "Editing", to: "Browsing", event: "SAVE" },
    { from: "Editing", to: "Browsing", event: "CANCEL" },
    { from: "Browsing", to: "Deleting", event: "DELETE" },
    { from: "Deleting", to: "Browsing", event: "CONFIRM" },
    { from: "Deleting", to: "Browsing", event: "CANCEL" },
  ],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    layoutData: buildLayout(crudStateMachine, "TaskInteraction"),
  },
};

export const SimpleLinear: Story = {
  args: {
    layoutData: buildLayout(linearStateMachine, "WizardFlow"),
  },
};

export const WithGuards: Story = {
  args: {
    layoutData: buildLayout(guardedStateMachine, "PaymentProcess"),
  },
};

export const WithSelfLoop: Story = {
  args: {
    layoutData: buildLayout(selfLoopStateMachine, "DashboardInteraction"),
  },
};

export const SelectedState: Story = {
  args: {
    layoutData: buildLayout(selectedStateStateMachine, "CRUDInteraction"),
  },
};
