import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ValidationReportBoard } from "./ValidationReportBoard";
import type { ValidationError } from "./ValidationReportBoard";

const meta: Meta<typeof ValidationReportBoard> = {
  title: "Builder/Organisms/ValidationReportBoard",
  component: ValidationReportBoard,
  tags: ["autodocs"],
  args: {
    onApplyFix: fn(),
    onApplyAllFixes: fn(),
    onRerunValidation: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ValidationReportBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const sampleErrors: ValidationError[] = [
  {
    code: "MISSING_INITIAL",
    message: "No initial state defined in TaskInteraction state machine",
    severity: "error",
    path: "orbitals[0].traits[0].stateMachine",
    suggestion: "Add isInitial: true to one of the states",
  },
  {
    code: "ORPHAN_TRANSITION",
    message: "Transition references non-existent state 'Archived'",
    severity: "error",
    path: "orbitals[0].traits[0].stateMachine.transitions[5]",
    suggestion: "Add an 'Archived' state or change the transition target",
  },
  {
    code: "INVALID_BINDING_PATH",
    message: "Binding @result.data is not a valid binding root",
    severity: "error",
    path: "orbitals[0].traits[0].stateMachine.transitions[2].effects[0]",
    suggestion: "Use @entity.field or @payload.field instead of @result",
  },
];

const sampleWarnings: ValidationError[] = [
  {
    code: "EMPTY_TYPOGRAPHY",
    message: "Typography component has no children or text content",
    severity: "warning",
    path: "orbitals[0].traits[0].stateMachine.transitions[0].effects[1]",
    suggestion: "Add text content to the Typography component",
  },
  {
    code: "MISSING_PAGE_PURPOSE",
    message: "Page 'SettingsPage' has no description or purpose defined",
    severity: "warning",
    path: "orbitals[1].pages[0]",
  },
  {
    code: "DUPLICATE_EVENT",
    message: "Event 'SAVE' is declared twice in TaskInteraction",
    severity: "warning",
    path: "orbitals[0].traits[0].stateMachine.events",
    suggestion: "Remove the duplicate event declaration",
  },
];

const autoFixableErrors: ValidationError[] = [
  {
    code: "EMPTY_TYPOGRAPHY",
    message: "Typography component has empty content in form header",
    severity: "warning",
    path: "orbitals[0].traits[0].transitions[0].effects[2]",
    suggestion: "Add placeholder text or remove the component",
  },
  {
    code: "MISSING_INITIAL",
    message: "State machine has no initial state marked",
    severity: "error",
    path: "orbitals[0].traits[0].stateMachine",
    suggestion: "Set isInitial: true on the first state",
  },
  {
    code: "DUPLICATE_INITIAL_STATE",
    message: "Multiple states marked as initial: Browsing, Idle",
    severity: "error",
    path: "orbitals[0].traits[0].stateMachine.states",
    suggestion: "Remove isInitial from all but one state",
  },
  {
    code: "MISSING_ENTITY_ID",
    message: "Entity 'Task' has no id field defined",
    severity: "error",
    path: "orbitals[0].entity",
    suggestion: "Add an 'id' field with type 'string' to the entity",
  },
  {
    code: "INVALID_EVENT_KEY",
    message: "Event key 'save' should be uppercase 'SAVE'",
    severity: "warning",
    path: "orbitals[0].traits[0].stateMachine.events[3]",
    suggestion: "Rename event key to 'SAVE'",
  },
];

const manyErrors: ValidationError[] = Array.from({ length: 20 }, (_, i) => ({
  code: ["MISSING_INITIAL", "ORPHAN_TRANSITION", "INVALID_BINDING_PATH", "EMPTY_TYPOGRAPHY", "DUPLICATE_EVENT"][i % 5],
  message: `Validation issue #${i + 1}: ${[
    "Missing initial state in state machine",
    "Transition to non-existent state",
    "Invalid binding path used in effect",
    "Empty typography content detected",
    "Duplicate event declaration found",
  ][i % 5]}`,
  severity: (i % 3 === 0 ? "error" : "warning") as ValidationError["severity"],
  path: `orbitals[${Math.floor(i / 4)}].traits[${i % 3}]`,
  suggestion: i % 2 === 0 ? "Apply the suggested automatic fix" : undefined,
}));

// =============================================================================
// Stories
// =============================================================================

/** Default with a mix of errors and warnings */
export const Default: Story = {
  args: {
    errors: sampleErrors,
    warnings: sampleWarnings,
  },
};

/** Only errors, no warnings */
export const AllErrors: Story = {
  args: {
    errors: sampleErrors,
    warnings: [],
  },
};

/** Only warnings, no errors */
export const AllWarnings: Story = {
  args: {
    errors: [],
    warnings: sampleWarnings,
  },
};

/** Issues with auto-fixable codes highlighted */
export const WithAutoFix: Story = {
  args: {
    errors: autoFixableErrors.filter((e) => e.severity === "error"),
    warnings: autoFixableErrors.filter((e) => e.severity === "warning"),
  },
};

/** No issues - valid schema */
export const Empty: Story = {
  args: {
    errors: [],
    warnings: [],
  },
};

/** Large number of issues to test scrolling and grouping */
export const ManyErrors: Story = {
  args: {
    errors: manyErrors.filter((e) => e.severity === "error"),
    warnings: manyErrors.filter((e) => e.severity === "warning"),
  },
};

/** Validation currently running */
export const Validating: Story = {
  args: {
    errors: sampleErrors,
    warnings: sampleWarnings,
    isValidating: true,
  },
};

/** Fixes currently being applied */
export const ApplyingFixes: Story = {
  args: {
    errors: autoFixableErrors.filter((e) => e.severity === "error"),
    warnings: autoFixableErrors.filter((e) => e.severity === "warning"),
    isApplyingFixes: true,
  },
};
