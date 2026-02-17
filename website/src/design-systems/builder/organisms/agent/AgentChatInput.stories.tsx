import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AgentChatInput } from "./AgentChatInput";

const meta: Meta<typeof AgentChatInput> = {
  title: "Builder/Organisms/Agent/AgentChatInput",
  component: AgentChatInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentChatInput>;

export const Default: Story = {
  args: {
    onSend: fn(),
  },
};

export const Disabled: Story = {
  args: {
    onSend: fn(),
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    onSend: fn(),
    isProcessing: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSend: fn(),
    placeholder: "Ask the AI assistant...",
  },
};
