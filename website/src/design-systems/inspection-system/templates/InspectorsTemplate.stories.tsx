import type { Meta, StoryObj } from "@storybook/react";
import { InspectorsTemplate, InspectorEntity } from "./InspectorsTemplate";

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

const sampleInspectors: InspectorEntity[] = [
  {
    id: "insp-1",
    name: "Janez",
    surname: "Novak",
    email: "janez.novak@gov.si",
    phone: "+386 1 1234567",
    department: "Varnost hrane",
    employeeId: "INS-2020-001",
    isActive: true,
    inspectionCount: 45,
    lastInspectionDate: "2024-01-15T00:00:00Z",
    unitName: "Glavna enota Ljubljana",
    unitEmail: "ljubljana.glavna@gov.si",
    unitPhone: "+386 1 3334444",
  },
  {
    id: "insp-2",
    name: "Marija",
    surname: "Horvat",
    email: "marija.horvat@gov.si",
    phone: "+386 2 2345678",
    department: "Požarna varnost",
    employeeId: "INS-2021-015",
    isActive: true,
    inspectionCount: 32,
    lastInspectionDate: "2024-01-18T00:00:00Z",
    unitName: "Luka Koper enota",
    unitEmail: "koper.luka@gov.si",
    unitPhone: "+386 5 5556666",
  },
  {
    id: "insp-3",
    name: "Marko",
    surname: "Kovač",
    email: "marko.kovac@gov.si",
    phone: "+386 4 3456789",
    department: "Gradbena inšpekcija",
    employeeId: "INS-2019-008",
    isActive: true,
    inspectionCount: 67,
  },
  {
    id: "insp-4",
    name: "Ana",
    surname: "Zupan",
    email: "ana.zupan@gov.si",
    phone: "+386 3 4567890",
    department: "Varstvo okolja",
    employeeId: "INS-2022-023",
    isActive: false,
    inspectionCount: 12,
  },
];

export const Default: Story = {
  args: {
    entity: sampleInspectors,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const ActiveOnly: Story = {
  args: {
    entity: sampleInspectors.filter((i) => i.isActive),
    title: "Active Inspectors",
  },
};

export const SingleInspector: Story = {
  args: {
    entity: [sampleInspectors[0]],
  },
};
