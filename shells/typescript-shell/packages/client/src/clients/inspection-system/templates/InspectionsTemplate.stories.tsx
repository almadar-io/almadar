import type { Meta, StoryObj } from "@storybook/react";
import { InspectionsTemplate, InspectionData } from "./InspectionsTemplate";

const meta: Meta<typeof InspectionsTemplate> = {
  title: "Clients/Inspection-System/Templates/InspectionsTemplate",
  component: InspectionsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InspectionsTemplate>;

const sampleInspections: InspectionData[] = [
  {
    id: "insp-1",
    companyName: "Golden Dragon Restaurant",
    companyId: "comp-1",
    inspectorName: "Ahmad Hassan",
    inspectorId: "insp-1",
    phase: "preparation",
    fieldType: "Restaurant",
    scheduledDate: "2024-01-20T09:00:00Z",
  },
  {
    id: "insp-2",
    companyName: "Fresh Foods Market",
    companyId: "comp-2",
    inspectorName: "Sarah Ali",
    inspectorId: "insp-2",
    phase: "execution",
    fieldType: "Retail",
    scheduledDate: "2024-01-19T10:00:00Z",
    startedAt: "2024-01-19T10:15:00Z",
    rulesChecked: 12,
    totalRules: 25,
    complianceRate: 75,
  },
  {
    id: "insp-3",
    companyName: "Tech Solutions Inc.",
    companyId: "comp-3",
    inspectorName: "Mohammad Khan",
    inspectorId: "insp-3",
    phase: "documentation",
    fieldType: "Office",
    scheduledDate: "2024-01-18T14:00:00Z",
    startedAt: "2024-01-18T14:10:00Z",
    rulesChecked: 18,
    totalRules: 20,
    complianceRate: 90,
  },
  {
    id: "insp-4",
    companyName: "City Warehouse Ltd.",
    companyId: "comp-4",
    inspectorName: "Ahmad Hassan",
    inspectorId: "insp-1",
    phase: "completed",
    fieldType: "Warehouse",
    scheduledDate: "2024-01-15T08:00:00Z",
    startedAt: "2024-01-15T08:05:00Z",
    completedAt: "2024-01-15T12:30:00Z",
    rulesChecked: 30,
    totalRules: 30,
    complianceRate: 87,
  },
  {
    id: "insp-5",
    companyName: "Sunset Cafe",
    companyId: "comp-5",
    inspectorName: "Sarah Ali",
    inspectorId: "insp-2",
    phase: "completed",
    fieldType: "Restaurant",
    scheduledDate: "2024-01-14T11:00:00Z",
    completedAt: "2024-01-14T15:00:00Z",
    rulesChecked: 22,
    totalRules: 22,
    complianceRate: 95,
  },
];

export const Default: Story = {
  args: {
    items: sampleInspections,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: new Error("Failed to load inspections"),
  },
};

export const PreparationOnly: Story = {
  args: {
    items: sampleInspections.filter((i) => i.phase === "preparation"),
    title: "Scheduled Inspections",
  },
};

export const InProgressOnly: Story = {
  args: {
    items: sampleInspections.filter((i) => i.phase === "execution" || i.phase === "documentation"),
    title: "Active Inspections",
  },
};

export const CompletedOnly: Story = {
  args: {
    items: sampleInspections.filter((i) => i.phase === "completed"),
    title: "Completed Inspections",
  },
};
