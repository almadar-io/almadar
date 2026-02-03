import type { Meta, StoryObj } from "@storybook/react";
import { ParticipantList } from "./ParticipantList";

const meta: Meta<typeof ParticipantList> = {
  title: "Clients/Inspection-System/Molecules/ParticipantList",
  component: ParticipantList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ParticipantList>;

const sampleParticipants = [
  {
    id: "p1",
    name: "John",
    surname: "Smith",
    positionInCompany: "General Manager",
    contactInfo: "+1 555-0123",
    addedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "p2",
    name: "Sarah",
    surname: "Johnson",
    positionInCompany: "Operations Director",
    contactInfo: "sarah.j@company.com",
    addedAt: "2024-01-15T10:35:00Z",
  },
  {
    id: "p3",
    name: "Mike",
    surname: "Williams",
    positionInCompany: "Safety Officer",
    addedAt: "2024-01-15T10:40:00Z",
  },
];

export const Default: Story = {
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants,
  },
};

export const Empty: Story = {
  args: {
    inspectionId: "insp-123",
    participants: [],
  },
};

export const SingleParticipant: Story = {
  args: {
    inspectionId: "insp-123",
    participants: [sampleParticipants[0]],
    minParticipants: 1,
  },
};

export const ReadOnly: Story = {
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants,
    readOnly: true,
  },
};

export const MinimumRequired: Story = {
  args: {
    inspectionId: "insp-123",
    participants: [],
    minParticipants: 2,
  },
};

export const NoEdit: Story = {
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants,
    allowEdit: false,
  },
};
