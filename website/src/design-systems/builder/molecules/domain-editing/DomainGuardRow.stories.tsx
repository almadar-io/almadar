import type { Meta, StoryObj } from "@storybook/react";
import { DomainGuardRow } from "./DomainGuardRow";
import type { GuardExpression } from "./DomainGuardRow";

const meta: Meta<typeof DomainGuardRow> = {
  title: "Builder/Molecules/DomainEditing/DomainGuardRow",
  component: DomainGuardRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainGuardRow>;

const comparisonGuard: GuardExpression = {
  type: "comparison",
  raw: 'Order.amount > 100',
  field: { entityName: "Order", fieldName: "amount" },
  operator: ">",
  value: 100,
};

const fieldCheckGuard: GuardExpression = {
  type: "field_check",
  raw: "email is provided",
  field: { entityName: "User", fieldName: "email" },
  operator: "provided",
};

const userCheckGuard: GuardExpression = {
  type: "user_check",
  raw: "user is admin",
  role: "admin",
};

export const Default: Story = {
  args: {
    guard: comparisonGuard,
    onEdit: () => {},
  },
};

export const FieldCheck: Story = {
  args: {
    guard: fieldCheckGuard,
    onEdit: () => {},
  },
};

export const UserCheck: Story = {
  args: {
    guard: userCheckGuard,
    onEdit: () => {},
  },
};

export const LogicalComposite: Story = {
  args: {
    guard: {
      type: "logical",
      raw: 'Order.amount > 100 AND user is admin',
      operator: "AND",
      left: comparisonGuard,
      right: userCheckGuard,
    },
    onEdit: () => {},
  },
};

export const WithError: Story = {
  args: {
    guard: {
      type: "comparison",
      raw: 'Order.missing_field == true',
      field: { entityName: "Order", fieldName: "missing_field" },
      operator: "==",
      value: true,
    },
    error: "Field 'missing_field' does not exist on entity Order",
    onEdit: () => {},
  },
};

export const Small: Story = {
  args: {
    guard: comparisonGuard,
    size: "sm",
    onEdit: () => {},
  },
};
