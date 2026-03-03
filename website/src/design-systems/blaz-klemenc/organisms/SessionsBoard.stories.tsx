import type { Meta, StoryObj } from "@storybook/react";
import { SessionsBoard } from "./SessionsBoard";
import type { TrainingSessionData } from "./SessionsBoard";

const mockSessions: TrainingSessionData[] = [
  {
    id: "session-1",
    traineeId: "user-1",
    trainerId: "trainer-1",
    title: "Personal Training - Ana",
    scheduledAt: "2026-02-18T09:00:00Z",
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-2",
    trainerId: "trainer-1",
    title: "Group HIIT Bootcamp",
    scheduledAt: "2026-02-18T11:00:00Z",
    duration: 45,
    status: "in-progress",
    isGroupSession: true,
    maxParticipants: 12,
    youtubeLink: "https://youtube.com/watch?v=example",
  },
  {
    id: "session-3",
    traineeId: "user-2",
    trainerId: "trainer-1",
    title: "Strength Session - Marko",
    scheduledAt: "2026-02-17T14:00:00Z",
    duration: 75,
    status: "completed",
    isGroupSession: false,
  },
  {
    id: "session-4",
    traineeId: "user-3",
    trainerId: "trainer-1",
    title: "Mobility Session - Luka",
    scheduledAt: "2026-02-16T10:00:00Z",
    duration: 45,
    status: "cancelled",
    isGroupSession: false,
  },
  {
    id: "session-5",
    trainerId: "trainer-1",
    title: "Group Yoga",
    scheduledAt: "2026-02-19T08:00:00Z",
    duration: 60,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 20,
  },
];

const meta: Meta<typeof SessionsBoard> = {
  title: "Blaz-Klemenc/Organisms/SessionsBoard",
  component: SessionsBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SessionsBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockSessions },
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    startEvent: "START",
    completeEvent: "COMPLETE",
    cancelEvent: "CANCEL",
    deleteEvent: "DELETE",
    searchEvent: "SEARCH",
    filterEvent: "FILTER",
  },
};

export const Loading: Story = {
  args: {
    entity: { items: [] },
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: { items: [] },
  },
};

export const ErrorState: Story = {
  args: {
    entity: { items: [] },
    error: new Error("Failed to load training sessions"),
  },
};
