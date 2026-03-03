import type { Meta, StoryObj } from "@storybook/react";
import { SessionDetailBoard } from "./SessionDetailBoard";
import type { TrainingSessionEntity } from "./SessionDetailBoard";

const mockSession: TrainingSessionEntity = {
  id: "session-1",
  traineeId: "user-1",
  trainerId: "trainer-1",
  title: "Personal Strength Training",
  scheduledAt: "2026-02-18T14:00:00Z",
  duration: 60,
  status: "scheduled",
  isGroupSession: false,
  notes: "Focus on compound movements today. Warm up with 5 min cardio, then move into main lifts. Track RPE for each set.",
  location: "Studio A - Ground Floor",
  youtubeLink: "https://youtube.com/watch?v=example",
  createdAt: "2026-02-10T09:00:00Z",
  updatedAt: "2026-02-17T11:00:00Z",
  trainer: {
    id: "trainer-1",
    name: "Blaz Klemenc",
    email: "blaz@example.com",
  },
  participants: [
    { id: "user-1", name: "Ana Kovac", email: "ana@example.com", attended: true },
  ],
  exercises: [
    { name: "Squat", sets: 4, reps: 6, weight: 100 },
    { name: "Bench Press", sets: 4, reps: 8, weight: 70 },
    { name: "Barbell Row", sets: 3, reps: 10, weight: 60 },
    { name: "Overhead Press", sets: 3, reps: 8, weight: 40, notes: "Focus on shoulder stability" },
  ],
};

const mockGroupSession: TrainingSessionEntity = {
  id: "session-2",
  trainerId: "trainer-1",
  title: "Group HIIT Bootcamp",
  scheduledAt: "2026-02-19T10:00:00Z",
  duration: 45,
  status: "in-progress",
  isGroupSession: true,
  maxParticipants: 12,
  notes: "High intensity interval training. 30s work / 15s rest format.",
  location: "Outdoor Training Area",
  createdAt: "2026-02-12T08:00:00Z",
  trainer: {
    id: "trainer-1",
    name: "Blaz Klemenc",
  },
  participants: [
    { id: "user-1", name: "Ana Kovac", attended: true },
    { id: "user-2", name: "Marko Horvat", attended: true },
    { id: "user-3", name: "Luka Novak", attended: false },
    { id: "user-4", name: "Maja Krajnc" },
  ],
};

const meta: Meta<typeof SessionDetailBoard> = {
  title: "Blaz-Klemenc/Organisms/SessionDetailBoard",
  component: SessionDetailBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SessionDetailBoard>;

export const Default: Story = {
  args: {
    entity: mockSession,
    editEvent: "EDIT",
    startEvent: "START",
    completeEvent: "COMPLETE",
    cancelEvent: "CANCEL",
    deleteEvent: "DELETE",
    backEvent: "BACK",
  },
};

export const GroupSession: Story = {
  args: {
    entity: mockGroupSession,
    editEvent: "EDIT",
    startEvent: "START",
    completeEvent: "COMPLETE",
    cancelEvent: "CANCEL",
    deleteEvent: "DELETE",
    backEvent: "BACK",
  },
};

export const CompletedSession: Story = {
  args: {
    entity: { ...mockSession, status: "completed" },
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
  },
};

export const Loading: Story = {
  args: {
    entity: { id: "", title: "", scheduledAt: "", duration: 0 },
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: { id: "", title: "", scheduledAt: "", duration: 0 },
  },
};

export const ErrorState: Story = {
  args: {
    entity: { id: "", title: "", scheduledAt: "", duration: 0 },
    error: new Error("Failed to load session details"),
  },
};
