import type { Meta, StoryObj } from "@storybook/react";
import { WorkoutPlanCard, WorkoutPlanData, WorkoutExercise } from "./WorkoutPlanCard";

const meta: Meta<typeof WorkoutPlanCard> = {
  title: "Blaz-Klemenc/Molecules/WorkoutPlanCard",
  component: WorkoutPlanCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WorkoutPlanCard>;

const sampleExercises: WorkoutExercise[] = [
  { name: "Squat", sets: 4, reps: 8, weight: 100 },
  { name: "Bench Press", sets: 4, reps: 8, weight: 80 },
  { name: "Barbell Row", sets: 4, reps: 10, weight: 70 },
  { name: "Overhead Press", sets: 3, reps: 10, weight: 50 },
  { name: "Bicep Curls", sets: 3, reps: 12, weight: 15 },
];

const baseWorkout: WorkoutPlanData = {
  id: "wp-1",
  title: "Upper Body Strength",
  scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  duration: 75,
  status: "scheduled",
  exercises: sampleExercises,
};

export const Default: Story = {
  args: {
    data: baseWorkout,
  },
};

export const InProgress: Story = {
  args: {
    data: {
      ...baseWorkout,
      title: "Push Day",
      status: "in-progress",
      scheduledAt: new Date(),
      exercises: sampleExercises.map((e, i) => ({
        ...e,
        completed: i < 2,
      })),
    },
  },
};

export const Completed: Story = {
  args: {
    data: {
      ...baseWorkout,
      title: "Leg Day",
      status: "completed",
      scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      exercises: sampleExercises.map((e) => ({ ...e, completed: true })),
    },
  },
};

export const WithYouTubeLink: Story = {
  args: {
    data: {
      ...baseWorkout,
      youtubeLink: "https://youtube.com/watch?v=example",
    },
  },
};

export const GroupSession: Story = {
  args: {
    data: {
      ...baseWorkout,
      title: "HIIT Circuit",
      isGroupSession: true,
      maxParticipants: 10,
      duration: 45,
    },
  },
};

export const WithNotes: Story = {
  args: {
    data: {
      ...baseWorkout,
      notes: "Focus on controlled eccentric phase. Rest 90 seconds between sets.",
    },
  },
};

export const ManyExercises: Story = {
  args: {
    data: {
      ...baseWorkout,
      title: "Full Body",
      exercises: [
        ...sampleExercises,
        { name: "Lunges", sets: 3, reps: 12 },
        { name: "Tricep Dips", sets: 3, reps: 15 },
        { name: "Plank", sets: 3, reps: 60, notes: "seconds" },
      ],
    },
  },
};

export const Compact: Story = {
  args: {
    data: baseWorkout,
    compact: true,
  },
};

export const HideExercises: Story = {
  args: {
    data: baseWorkout,
    showExercises: false,
  },
};

export const HideActions: Story = {
  args: {
    data: baseWorkout,
    showActions: false,
  },
};

export const Cancelled: Story = {
  args: {
    data: {
      ...baseWorkout,
      title: "Recovery Session",
      status: "cancelled",
    },
  },
};
