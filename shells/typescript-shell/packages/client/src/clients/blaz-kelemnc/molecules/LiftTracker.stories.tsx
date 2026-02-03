import type { Meta, StoryObj } from "@storybook/react";
import { LiftTracker } from "./LiftTracker";

const meta: Meta<typeof LiftTracker> = {
  title: "Blaz-Klemenc/Molecules/LiftTracker",
  component: LiftTracker,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiftTracker>;

const sampleLifts = [
  {
    id: "lift-1",
    exerciseName: "Squat",
    weight: 100,
    reps: 8,
    sets: 4,
    date: new Date("2024-01-15"),
    notes: "Felt strong today",
  },
  {
    id: "lift-2",
    exerciseName: "Deadlift",
    weight: 120,
    reps: 5,
    sets: 5,
    date: new Date("2024-01-14"),
  },
  {
    id: "lift-3",
    exerciseName: "Bench Press",
    weight: 80,
    reps: 10,
    sets: 3,
    date: new Date("2024-01-13"),
    notes: "Working on form",
  },
];

export const Default: Story = {
  args: {
    lifts: sampleLifts,
  },
};

export const SingleLift: Story = {
  args: {
    lifts: [sampleLifts[0]],
  },
};

export const EmptyState: Story = {
  args: {
    lifts: [],
  },
};

export const WithSummary: Story = {
  args: {
    lifts: sampleLifts,
    showSummary: true,
  },
};

export const WithTraineeContext: Story = {
  args: {
    lifts: sampleLifts,
    traineeId: "trainee-123",
    trainerId: "trainer-456",
  },
};

export const ManyLifts: Story = {
  args: {
    lifts: [
      ...sampleLifts,
      {
        id: "lift-4",
        exerciseName: "Overhead Press",
        weight: 50,
        reps: 8,
        sets: 4,
        date: new Date("2024-01-12"),
      },
      {
        id: "lift-5",
        exerciseName: "Barbell Row",
        weight: 70,
        reps: 10,
        sets: 3,
        date: new Date("2024-01-11"),
      },
      {
        id: "lift-6",
        exerciseName: "Squat",
        weight: 105,
        reps: 6,
        sets: 4,
        date: new Date("2024-01-10"),
        notes: "PR attempt",
      },
    ],
    showSummary: true,
  },
};
