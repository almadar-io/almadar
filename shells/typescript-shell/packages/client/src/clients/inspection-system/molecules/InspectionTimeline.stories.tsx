import type { Meta, StoryObj } from "@storybook/react";
import { InspectionTimeline, TimelineItem } from "./InspectionTimeline";

const meta: Meta<typeof InspectionTimeline> = {
  title: "Clients/Inspection-System/Molecules/InspectionTimeline",
  component: InspectionTimeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InspectionTimeline>;

const sampleItems: TimelineItem[] = [
  {
    id: "1",
    type: "start",
    title: "Inspection Started",
    description: "Field inspection initiated at business premises",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    user: "Inspector Ahmad",
  },
  {
    id: "2",
    type: "participant_added",
    title: "Participant Added",
    description: "John Smith (General Manager) joined the inspection",
    timestamp: new Date(Date.now() - 3300000).toISOString(),
    user: "Inspector Ahmad",
  },
  {
    id: "3",
    type: "rule_checked",
    title: "Rule Checked: Fire Safety",
    description: "Fire extinguisher inspection - Compliant",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    user: "Inspector Ahmad",
  },
  {
    id: "4",
    type: "photo_added",
    title: "Photo Evidence Added",
    description: "Photo of fire extinguisher certificate",
    timestamp: new Date(Date.now() - 2100000).toISOString(),
    user: "Inspector Ahmad",
  },
  {
    id: "5",
    type: "finding",
    title: "Non-Compliance Found",
    description: "Emergency exit sign not illuminated",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    user: "Inspector Ahmad",
  },
  {
    id: "6",
    type: "objection",
    title: "Objection Recorded",
    description: "Manager disputes finding regarding exit sign",
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    user: "John Smith",
  },
  {
    id: "7",
    type: "pause",
    title: "Inspection Paused",
    description: "Lunch break",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    user: "Inspector Ahmad",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    compact: true,
  },
};

export const AbsoluteTime: Story = {
  args: {
    items: sampleItems,
    relativeTime: false,
  },
};

export const Clickable: Story = {
  args: {
    items: sampleItems,
    clickable: true,
    onItemClick: (item) => alert(`Clicked: ${item.title}`),
  },
};

export const CompletedInspection: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: "8",
        type: "resume",
        title: "Inspection Resumed",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        user: "Inspector Ahmad",
      },
      {
        id: "9",
        type: "document",
        title: "Report Generated",
        description: "Final inspection report created",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        user: "System",
      },
      {
        id: "10",
        type: "complete",
        title: "Inspection Completed",
        description: "All procedures completed successfully",
        timestamp: new Date(Date.now() - 60000).toISOString(),
        user: "Inspector Ahmad",
      },
    ],
  },
};
