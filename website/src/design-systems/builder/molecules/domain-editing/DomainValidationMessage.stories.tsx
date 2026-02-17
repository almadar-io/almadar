import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DomainValidationMessage, DomainValidationSummary } from "./DomainValidationMessage";

const meta: Meta<typeof DomainValidationMessage> = {
  title: "Builder/Molecules/DomainEditing/DomainValidationMessage",
  component: DomainValidationMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainValidationMessage>;

export const Default: Story = {
  args: {
    message: "Entity 'Task' has no fields defined",
    severity: "error",
  },
};

export const Warning: Story = {
  args: {
    message: "Behavior 'TaskInteraction' has unreachable state 'Archiving'",
    severity: "warning",
  },
};

export const Info: Story = {
  args: {
    message: "Consider adding a 'description' field to improve discoverability",
    severity: "info",
  },
};

export const Success: Story = {
  args: {
    message: "All entity validations passed successfully",
    severity: "success",
  },
};

export const WithSuggestion: Story = {
  args: {
    message: "Missing INIT transition on trait 'OrderInteraction'",
    severity: "error",
    suggestion:
      "Add a self-loop transition from the initial state on the INIT event to render the default UI.",
    sectionId: "behavior_OrderInteraction",
    sectionType: "behavior",
  },
};

export const WithQuickFix: Story = {
  args: {
    message: "Event 'ARCHIVE' is emitted but no trait listens for it",
    severity: "warning",
    suggestion: "Add a listens declaration in the target trait or remove the emit.",
    quickFix: {
      label: "Add listener to TaskArchival",
      onClick: fn(),
    },
  },
};

export const Compact: Story = {
  args: {
    message: "Duplicate field name 'status' in entity Task",
    severity: "error",
    compact: true,
  },
};

export const Dismissible: Story = {
  args: {
    message: "This page has no traits assigned to it",
    severity: "warning",
    dismissible: true,
    onDismiss: fn(),
  },
};

export const ValidationSummaryErrors: Story = {
  render: () => (
    <DomainValidationSummary
      summary={{ errors: 3, warnings: 7 }}
      onClick={fn()}
    />
  ),
};

export const ValidationSummaryValid: Story = {
  render: () => (
    <DomainValidationSummary
      summary={{ errors: 0, warnings: 0 }}
    />
  ),
};
