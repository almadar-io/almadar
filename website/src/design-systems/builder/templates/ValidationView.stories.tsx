import type { Meta, StoryObj } from "@storybook/react";
import { ValidationView } from "./ValidationView";
import type { ValidationViewProps } from "./ValidationView";

const meta: Meta<typeof ValidationView> = {
  title: "Builder/Templates/ValidationView",
  component: ValidationView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ValidationView>;

const baseArgs: ValidationViewProps = {
  stage: "complete",
  isValidating: false,
  isFixing: false,
  errors: [],
  warnings: [],
  isValid: true,
  onValidate: () => {},
};

export const Default: Story = {
  args: baseArgs,
};

export const WithErrors: Story = {
  args: {
    ...baseArgs,
    isValid: false,
    errors: [
      {
        code: "UNREACHABLE_STATE",
        message: "State 'Archiving' has no incoming transitions and can never be reached",
        severity: "error",
        path: "orbitals[0].traits[0].stateMachine.states[5]",
        suggestion: "Add a transition leading to 'Archiving' or remove the state",
      },
      {
        code: "MISSING_LISTENER",
        message: "Event 'TASK_UPDATED' is emitted but no trait listens for it",
        severity: "error",
        path: "orbitals[0].traits[0].emits[1]",
      },
      {
        code: "INVALID_BINDING",
        message: "Binding '@result.data' uses invalid root '@result'",
        severity: "error",
        path: "orbitals[0].traits[0].transitions[3].effects[0]",
        suggestion: "Use @entity or @payload instead of @result",
      },
    ],
    warnings: [
      {
        code: "UNUSED_EVENT",
        message: "Event 'ARCHIVE' is declared but never used in any transition",
        severity: "warning",
        path: "orbitals[0].traits[0].events[7]",
      },
    ],
  },
};

export const Valid: Story = {
  args: {
    ...baseArgs,
    stage: "complete",
    isValid: true,
    errors: [],
    warnings: [],
  },
};

export const Validating: Story = {
  args: {
    ...baseArgs,
    stage: "validating",
    isValidating: true,
    isValid: false,
    progressMessage: "Checking closed circuit integrity...",
    errors: [],
    warnings: [],
  },
};
