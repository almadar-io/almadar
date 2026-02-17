import type { Meta, StoryObj } from "@storybook/react";
import { DomainTransitionRow } from "./DomainTransitionRow";
import type { GuardExpression } from "./DomainGuardRow";
import type { TransitionEffect } from "./DomainTransitionRow";

const meta: Meta<typeof DomainTransitionRow> = {
  title: "Builder/Molecules/DomainEditing/DomainTransitionRow",
  component: DomainTransitionRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainTransitionRow>;

const sampleGuards: GuardExpression[] = [
  {
    type: "comparison",
    raw: 'Order.amount > 0',
    field: { entityName: "Order", fieldName: "amount" },
    operator: ">",
    value: 0,
  },
  {
    type: "user_check",
    raw: "user is admin",
    role: "admin",
  },
];

const sampleEffects: TransitionEffect[] = [
  {
    type: "notify",
    description: "Send confirmation email to user",
  },
  {
    type: "update_field",
    description: 'Set status to "approved"',
  },
  {
    type: "emit_event",
    description: "Emit ORDER_APPROVED event",
  },
];

export const Default: Story = {
  args: {
    fromState: "Browsing",
    toState: "Creating",
    event: "CREATE",
    onEdit: () => {},
    onDelete: () => {},
    onStateClick: () => {},
  },
};

export const WithGuards: Story = {
  args: {
    fromState: "Reviewing",
    toState: "Approved",
    event: "APPROVE",
    guards: sampleGuards,
    onEdit: () => {},
    onDelete: () => {},
    onStateClick: () => {},
  },
};

export const WithEffects: Story = {
  args: {
    fromState: "Pending",
    toState: "Completed",
    event: "COMPLETE",
    effects: sampleEffects,
    onEdit: () => {},
    onDelete: () => {},
    onStateClick: () => {},
  },
};

export const WithGuardsAndEffects: Story = {
  args: {
    fromState: "Reviewing",
    toState: "Approved",
    event: "APPROVE",
    guards: [sampleGuards[0]],
    effects: [sampleEffects[0], sampleEffects[1]],
    onEdit: () => {},
    onDelete: () => {},
    onStateClick: () => {},
  },
};

export const WildcardFrom: Story = {
  args: {
    fromState: "*",
    toState: "Error",
    event: "SYSTEM_ERROR",
    effects: [
      {
        type: "navigate",
        description: "Redirect to error page",
      },
    ],
    onEdit: () => {},
    onDelete: () => {},
    onStateClick: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    fromState: "Idle",
    toState: "Active",
    event: "INIT",
    editable: false,
    onStateClick: () => {},
  },
};
