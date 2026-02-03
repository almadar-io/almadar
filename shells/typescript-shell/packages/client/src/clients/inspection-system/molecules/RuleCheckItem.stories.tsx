import type { Meta, StoryObj } from "@storybook/react";
import { RuleCheckItem } from "./RuleCheckItem";
import { VStack } from "../../../components/atoms/Stack";

const meta: Meta<typeof RuleCheckItem> = {
  title: "Clients/Inspection-System/Molecules/RuleCheckItem",
  component: RuleCheckItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: "select",
      options: ["critical", "major", "minor", "info"],
    },
    isCompliant: {
      control: "select",
      options: [null, true, false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RuleCheckItem>;

export const Default: Story = {
  args: {
    id: "rule-1",
    description: "Business premises must display valid operating license in visible location",
    gazetteNumber: "2023/45",
    article: "12",
    severity: "major",
  },
};

export const Compliant: Story = {
  args: {
    id: "rule-2",
    description: "Fire extinguishers must be inspected within the last 12 months",
    gazetteNumber: "2022/18",
    article: "8",
    severity: "critical",
    isCompliant: true,
  },
};

export const NonCompliant: Story = {
  args: {
    id: "rule-3",
    description: "Emergency exits must be clearly marked with illuminated signs",
    gazetteNumber: "2021/32",
    article: "15",
    severity: "critical",
    isCompliant: false,
    notes: "Exit sign on back door is not illuminated. Bulb appears to be burned out.",
  },
};

export const WithPhotos: Story = {
  args: {
    id: "rule-4",
    description: "Food storage areas must maintain temperature below 5°C",
    gazetteNumber: "2023/12",
    article: "24",
    severity: "major",
    isCompliant: false,
    notes: "Refrigerator showing 8°C at time of inspection",
    photoCount: 3,
  },
};

export const ReadOnly: Story = {
  args: {
    id: "rule-5",
    description: "Staff hygiene training certificates must be current",
    gazetteNumber: "2022/08",
    article: "31",
    severity: "minor",
    isCompliant: true,
    readOnly: true,
  },
};

export const AllSeverities: Story = {
  render: () => (
    <VStack gap="md">
      <RuleCheckItem
        id="critical-1"
        description="Critical safety requirement that must be addressed immediately"
        severity="critical"
        gazetteNumber="2023/01"
        article="1"
      />
      <RuleCheckItem
        id="major-1"
        description="Major compliance issue requiring prompt attention"
        severity="major"
        gazetteNumber="2023/02"
        article="2"
      />
      <RuleCheckItem
        id="minor-1"
        description="Minor issue that should be addressed within 30 days"
        severity="minor"
        gazetteNumber="2023/03"
        article="3"
      />
      <RuleCheckItem
        id="info-1"
        description="Informational guideline for best practices"
        severity="info"
        gazetteNumber="2023/04"
        article="4"
      />
    </VStack>
  ),
};
