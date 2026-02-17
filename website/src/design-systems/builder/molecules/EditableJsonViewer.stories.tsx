import type { Meta, StoryObj } from "@storybook/react";
import { EditableJsonViewer } from "./EditableJsonViewer";

const meta: Meta<typeof EditableJsonViewer> = {
  title: "Builder/Molecules/EditableJsonViewer",
  component: EditableJsonViewer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditableJsonViewer>;

export const Default: Story = {
  args: {
    data: { name: "TaskManager", version: "1.0", orbitals: 3 },
    onSave: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    data: { name: "TaskManager", version: "1.0", orbitals: 3 },
    readOnly: true,
  },
};

export const WithTitle: Story = {
  args: {
    data: { name: "TaskManager", version: "1.0", orbitals: 3 },
    title: "Schema JSON",
    onSave: () => {},
  },
};

export const LargeData: Story = {
  args: {
    data: {
      name: "HealthcareApp",
      version: "2.3.1",
      orbitals: [
        {
          name: "Patient Management",
          entity: {
            name: "Patient",
            fields: [
              { name: "firstName", type: "string" },
              { name: "lastName", type: "string" },
              { name: "dateOfBirth", type: "date" },
              { name: "status", type: "enum", values: ["active", "inactive", "discharged"] },
            ],
          },
          traits: ["PatientLifecycle", "PatientSearch"],
          pages: ["/patients", "/patients/:id"],
        },
        {
          name: "Appointment Scheduling",
          entity: {
            name: "Appointment",
            fields: [
              { name: "date", type: "date" },
              { name: "doctor", type: "relation" },
              { name: "notes", type: "string" },
            ],
          },
          traits: ["AppointmentWorkflow"],
          pages: ["/appointments"],
        },
      ],
      settings: {
        theme: "dark",
        locale: "en-US",
        features: { notifications: true, analytics: false },
      },
    },
    title: "Full Schema",
    maxHeight: "500px",
    onSave: () => {},
  },
};

export const Empty: Story = {
  args: {
    data: null,
  },
};
