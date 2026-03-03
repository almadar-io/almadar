import type { Meta, StoryObj } from "@storybook/react";
import { FitnessBoard } from "./FitnessBoard";
import type { LiftData } from "../molecules/LiftTracker";

const mockLifts: LiftData[] = [
  {
    id: "lift-1",
    traineeId: "user-1",
    exerciseName: "Bench Press",
    weight: 80,
    reps: 8,
    sets: 4,
    date: "2026-02-15",
    notes: "Felt strong today, increased weight by 2.5kg",
  },
  {
    id: "lift-2",
    traineeId: "user-1",
    exerciseName: "Squat",
    weight: 120,
    reps: 6,
    sets: 5,
    date: "2026-02-14",
    notes: "Deep squats, good form throughout",
  },
  {
    id: "lift-3",
    traineeId: "user-1",
    exerciseName: "Deadlift",
    weight: 140,
    reps: 5,
    sets: 3,
    date: "2026-02-13",
  },
  {
    id: "lift-4",
    traineeId: "user-1",
    exerciseName: "Overhead Press",
    weight: 50,
    reps: 10,
    sets: 3,
    date: "2026-02-12",
    notes: "Shoulder mobility improving",
  },
  {
    id: "lift-5",
    traineeId: "user-1",
    exerciseName: "Bench Press",
    weight: 77.5,
    reps: 8,
    sets: 4,
    date: "2026-02-10",
  },
];

const meta: Meta<typeof FitnessBoard> = {
  title: "Blaz-Klemenc/Organisms/FitnessBoard",
  component: FitnessBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof FitnessBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockLifts },
  },
};

export const WithProgressData: Story = {
  args: {
    entity: {
      items: mockLifts,
      progressData: [
        { date: "2026-02-01", value: 70 },
        { date: "2026-02-05", value: 72.5 },
        { date: "2026-02-10", value: 77.5 },
        { date: "2026-02-15", value: 80 },
      ],
    },
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
    error: new Error("Failed to load fitness data"),
  },
};
