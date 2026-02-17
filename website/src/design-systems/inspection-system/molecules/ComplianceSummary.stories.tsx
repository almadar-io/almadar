import type { Meta, StoryObj } from "@storybook/react";
import { ComplianceSummary } from "./ComplianceSummary";

const meta: Meta<typeof ComplianceSummary> = {
  title: "Clients/Inspection-System/Molecules/ComplianceSummary",
  component: ComplianceSummary,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComplianceSummary>;

export const Default: Story = {
  args: {
    stats: {
      total: 25,
      compliant: 18,
      nonCompliant: 5,
      notChecked: 2,
      critical: 1,
      major: 3,
      minor: 1,
    },
  },
};

export const HighCompliance: Story = {
  args: {
    stats: {
      total: 30,
      compliant: 28,
      nonCompliant: 2,
      notChecked: 0,
      critical: 0,
      major: 1,
      minor: 1,
    },
  },
};

export const LowCompliance: Story = {
  args: {
    stats: {
      total: 20,
      compliant: 8,
      nonCompliant: 10,
      notChecked: 2,
      critical: 3,
      major: 5,
      minor: 2,
    },
  },
};

export const InProgress: Story = {
  args: {
    stats: {
      total: 25,
      compliant: 10,
      nonCompliant: 3,
      notChecked: 12,
      critical: 1,
      major: 1,
      minor: 1,
    },
  },
};

export const WithComparison: Story = {
  args: {
    stats: {
      total: 25,
      compliant: 20,
      nonCompliant: 5,
      notChecked: 0,
      critical: 0,
      major: 3,
      minor: 2,
    },
    previousRate: 72,
  },
};

export const Compact: Story = {
  args: {
    stats: {
      total: 25,
      compliant: 18,
      nonCompliant: 5,
      notChecked: 2,
      critical: 1,
      major: 3,
      minor: 1,
    },
    compact: true,
  },
};

export const NoSeverityBreakdown: Story = {
  args: {
    stats: {
      total: 25,
      compliant: 18,
      nonCompliant: 5,
      notChecked: 2,
      critical: 1,
      major: 3,
      minor: 1,
    },
    showSeverityBreakdown: false,
  },
};
