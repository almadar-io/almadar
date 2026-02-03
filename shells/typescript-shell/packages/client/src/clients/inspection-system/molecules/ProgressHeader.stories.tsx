import type { Meta, StoryObj } from "@storybook/react";
import { ProgressHeader } from "./ProgressHeader";

const meta: Meta<typeof ProgressHeader> = {
  title: "Clients/Inspection-System/Molecules/ProgressHeader",
  component: ProgressHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressHeader>;

export const Default: Story = {
  args: {
    title: "Field Inspection",
    subtitle: "ABC Company Ltd.",
    phase: "execution",
    progress: 45,
  },
};

export const WithSteps: Story = {
  args: {
    title: "Restaurant Inspection",
    subtitle: "Golden Dragon Restaurant",
    phase: "execution",
    steps: [
      { id: "1", label: "Preparation", completed: true },
      { id: "2", label: "Company Info", completed: true },
      { id: "3", label: "Rule Check", completed: false, current: true },
      { id: "4", label: "Documentation", completed: false },
      { id: "5", label: "Signatures", completed: false },
    ],
  },
};

export const Preparation: Story = {
  args: {
    title: "New Inspection",
    subtitle: "Pending company selection",
    phase: "preparation",
    progress: 10,
  },
};

export const Documentation: Story = {
  args: {
    title: "Market Inspection",
    subtitle: "Fresh Foods Market",
    phase: "documentation",
    progress: 75,
    steps: [
      { id: "1", label: "Preparation", completed: true },
      { id: "2", label: "Company Info", completed: true },
      { id: "3", label: "Rule Check", completed: true },
      { id: "4", label: "Documentation", completed: false, current: true },
      { id: "5", label: "Signatures", completed: false },
    ],
  },
};

export const Completed: Story = {
  args: {
    title: "Completed Inspection",
    subtitle: "Tech Solutions Inc.",
    phase: "completed",
    progress: 100,
    steps: [
      { id: "1", label: "Preparation", completed: true },
      { id: "2", label: "Company Info", completed: true },
      { id: "3", label: "Rule Check", completed: true },
      { id: "4", label: "Documentation", completed: true },
      { id: "5", label: "Signatures", completed: true },
    ],
  },
};

export const NoSteps: Story = {
  args: {
    title: "Quick Inspection",
    subtitle: "Mobile Food Vendor",
    phase: "execution",
    progress: 60,
    showSteps: false,
  },
};
