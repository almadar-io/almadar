import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AgentStatusHeader } from "./AgentStatusHeader";

const meta: Meta<typeof AgentStatusHeader> = {
  title: "Builder/Organisms/Agent/AgentStatusHeader",
  component: AgentStatusHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["idle", "running", "complete", "error", "interrupted", "cancelled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgentStatusHeader>;

export const Default: Story = {
  args: {
    status: "idle",
  },
};

export const Running: Story = {
  args: {
    status: "running",
    skill: "kflow-orbitals",
    onCancel: fn(),
  },
};

export const Interrupted: Story = {
  args: {
    status: "interrupted",
    skill: "kflow-orbitals",
    onCancel: fn(),
  },
};

export const Error: Story = {
  args: {
    status: "error",
    skill: "kflow-orbitals",
  },
};

export const Completed: Story = {
  args: {
    status: "complete",
    skill: "kflow-orbitals",
  },
};

export const WithThread: Story = {
  args: {
    status: "running",
    skill: "kflow-orbitals",
    threadId: "thread-abc-123-def-456",
    onCancel: fn(),
  },
};
