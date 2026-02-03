import type { Meta, StoryObj } from "@storybook/react";
import { InspectorsTemplate, InspectorData } from "./InspectorsTemplate";

const meta: Meta<typeof InspectorsTemplate> = {
  title: "Clients/Inspection-System/Templates/InspectorsTemplate",
  component: InspectorsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InspectorsTemplate>;

const sampleInspectors: InspectorData[] = [
  {
    id: "insp-1",
    name: "Ahmad",
    surname: "Hassan",
    email: "ahmad.hassan@gov.ly",
    phone: "+218 91 1234567",
    department: "Food Safety",
    employeeId: "GOV-2020-001",
    isActive: true,
    inspectionCount: 45,
    lastInspectionDate: "2024-01-15T00:00:00Z",
  },
  {
    id: "insp-2",
    name: "Sarah",
    surname: "Ali",
    email: "sarah.ali@gov.ly",
    phone: "+218 92 2345678",
    department: "Fire Safety",
    employeeId: "GOV-2021-015",
    isActive: true,
    inspectionCount: 32,
    lastInspectionDate: "2024-01-18T00:00:00Z",
  },
  {
    id: "insp-3",
    name: "Mohammad",
    surname: "Khan",
    email: "mohammad.khan@gov.ly",
    phone: "+218 93 3456789",
    department: "Building Compliance",
    employeeId: "GOV-2019-008",
    isActive: true,
    inspectionCount: 67,
  },
  {
    id: "insp-4",
    name: "Fatima",
    surname: "Omar",
    email: "fatima.omar@gov.ly",
    phone: "+218 94 4567890",
    department: "Environmental",
    employeeId: "GOV-2022-023",
    isActive: false,
    inspectionCount: 12,
  },
];

export const Default: Story = {
  args: {
    items: sampleInspectors,
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

export const ActiveOnly: Story = {
  args: {
    items: sampleInspectors.filter((i) => i.isActive),
    title: "Active Inspectors",
  },
};

export const SingleInspector: Story = {
  args: {
    items: [sampleInspectors[0]],
  },
};
