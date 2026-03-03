import type { Meta, StoryObj } from "@storybook/react";
import { TraineeDetailBoard } from "./TraineeDetailBoard";
import type { UserEntity } from "./TraineeDetailBoard";

const mockTrainee: UserEntity = {
  id: "user-1",
  name: "Ana Kovac",
  email: "ana.kovac@example.com",
  role: "trainee",
  phone: "+386 40 123 456",
  createdAt: "2025-09-15T10:00:00Z",
  updatedAt: "2026-02-17T14:30:00Z",
  stats: {
    totalLifts: 245,
    totalSessions: 48,
    avgWellnessScore: 7.8,
    currentStreak: 12,
    milestonesAchieved: 5,
  },
  creditData: {
    id: "credit-1",
    traineeId: "user-1",
    totalCredits: 20,
    remainingCredits: 14,
    expiresAt: "2026-03-15T00:00:00Z",
  },
  progressData: [
    { date: "2026-01-01", value: 60 },
    { date: "2026-01-15", value: 65 },
    { date: "2026-02-01", value: 72 },
    { date: "2026-02-15", value: 78 },
  ],
};

const mockTrainer: UserEntity = {
  id: "trainer-1",
  name: "Blaz Klemenc",
  email: "blaz@example.com",
  role: "trainer",
  phone: "+386 41 987 654",
  createdAt: "2024-01-10T08:00:00Z",
};

const meta: Meta<typeof TraineeDetailBoard> = {
  title: "Blaz-Klemenc/Organisms/TraineeDetailBoard",
  component: TraineeDetailBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TraineeDetailBoard>;

export const Default: Story = {
  args: {
    entity: mockTrainee,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    viewLiftsEvent: "VIEW_LIFTS",
    viewSessionsEvent: "VIEW_SESSIONS",
  },
};

export const TrainerProfile: Story = {
  args: {
    entity: mockTrainer,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
  },
};

export const Loading: Story = {
  args: {
    entity: { id: "", name: "", email: "", role: "trainee" },
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: { id: "", name: "", email: "", role: "trainee" },
  },
};

export const ErrorState: Story = {
  args: {
    entity: { id: "", name: "", email: "", role: "trainee" },
    error: new Error("Failed to load trainee details"),
  },
};
