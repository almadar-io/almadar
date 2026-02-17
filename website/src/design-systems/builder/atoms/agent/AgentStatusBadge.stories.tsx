import type { Meta, StoryObj } from "@storybook/react";
import { AgentStatusBadge } from "./AgentStatusBadge";

const meta: Meta<typeof AgentStatusBadge> = {
  title: "Builder/Atoms/AgentStatusBadge",
  component: AgentStatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["idle", "running", "complete", "error", "interrupted"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    dotOnly: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgentStatusBadge>;

export const Idle: Story = {
  args: {
    status: "idle",
  },
};

export const Running: Story = {
  args: {
    status: "running",
  },
};

export const Complete: Story = {
  args: {
    status: "complete",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};

export const Interrupted: Story = {
  args: {
    status: "interrupted",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <AgentStatusBadge status="idle" />
      <AgentStatusBadge status="running" />
      <AgentStatusBadge status="complete" />
      <AgentStatusBadge status="error" />
      <AgentStatusBadge status="interrupted" />
    </div>
  ),
};

export const DotOnly: Story = {
  args: {
    status: "running",
    dotOnly: true,
  },
};

export const Small: Story = {
  args: {
    status: "running",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    status: "complete",
    size: "lg",
  },
};

export const CustomLabel: Story = {
  args: {
    status: "running",
    label: "Processing...",
  },
};
