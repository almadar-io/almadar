import type { Meta, StoryObj } from "@storybook/react";
import { PhaseIndicator } from "./PhaseIndicator";
import { HStack, VStack } from "../../../components/atoms/Stack";

const meta: Meta<typeof PhaseIndicator> = {
  title: "Clients/Inspection-System/Atoms/PhaseIndicator",
  component: PhaseIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    phase: {
      control: "select",
      options: ["preparation", "execution", "documentation", "review", "completed", "cancelled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhaseIndicator>;

export const Preparation: Story = {
  args: {
    phase: "preparation",
  },
};

export const Execution: Story = {
  args: {
    phase: "execution",
  },
};

export const Documentation: Story = {
  args: {
    phase: "documentation",
  },
};

export const Review: Story = {
  args: {
    phase: "review",
  },
};

export const Completed: Story = {
  args: {
    phase: "completed",
  },
};

export const Cancelled: Story = {
  args: {
    phase: "cancelled",
  },
};

export const AllPhases: Story = {
  render: () => (
    <VStack gap="md">
      <PhaseIndicator phase="preparation" />
      <PhaseIndicator phase="execution" />
      <PhaseIndicator phase="documentation" />
      <PhaseIndicator phase="review" />
      <PhaseIndicator phase="completed" />
      <PhaseIndicator phase="cancelled" />
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap="md" align="center">
      <PhaseIndicator phase="execution" size="sm" />
      <PhaseIndicator phase="execution" size="md" />
      <PhaseIndicator phase="execution" size="lg" />
    </HStack>
  ),
};

export const IconOnly: Story = {
  args: {
    phase: "execution",
    showLabel: false,
  },
};
