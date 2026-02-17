import type { Meta, StoryObj } from "@storybook/react";
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
    onSend: () => {},
  },
};

export const Disabled: Story = {
  args: {
    onSend: () => {},
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    onSend: () => {},
    isProcessing: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSend: () => {},
    placeholder: "Ask the AI assistant...",
  },
};
