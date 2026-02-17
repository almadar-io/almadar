import type { Meta, StoryObj } from "@storybook/react";
import { AgentAvatar } from "./AgentAvatar";

const meta: Meta<typeof AgentAvatar> = {
  title: "Builder/Atoms/AgentAvatar",
  component: AgentAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["assistant", "user", "system", "tool"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgentAvatar>;

export const Assistant: Story = {
  args: {
    role: "assistant",
    size: "md",
  },
};

export const User: Story = {
  args: {
    role: "user",
    size: "md",
  },
};

export const System: Story = {
  args: {
    role: "system",
    size: "md",
  },
};

export const Tool: Story = {
  args: {
    role: "tool",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    role: "assistant",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    role: "assistant",
    size: "lg",
  },
};

export const AllRoles: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <AgentAvatar role="assistant" />
      <AgentAvatar role="user" />
      <AgentAvatar role="system" />
      <AgentAvatar role="tool" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <AgentAvatar role="assistant" size="sm" />
      <AgentAvatar role="assistant" size="md" />
      <AgentAvatar role="assistant" size="lg" />
    </div>
  ),
};
