import type { Meta, StoryObj } from "@storybook/react";
import { FitnessTemplate } from "./FitnessTemplate";

// Define types inline to avoid bundling issues
interface LiftData {
  id: string;
  traineeId?: string;
  exerciseName: string;
  date: Date;
  weight: number;
  sets: number;
  reps: number;
  notes?: string;
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

const meta: Meta<typeof FitnessTemplate> = {
  title: "Blaz-Klemenc/Templates/FitnessTemplate",
  component: FitnessTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
    showWellnessInput: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FitnessTemplate>;

// Helper to generate dates
const getDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Sample lifts data
const sampleLifts: LiftData[] = [
  {
    id: "lift-1",
    traineeId: "trainee-1",
    exerciseName: "Bench Press",
    date: getDate(0),
    weight: 80,
    sets: 4,
    reps: 8,
    notes: "Felt strong, increased from 75kg last week",
  },
  {
    id: "lift-2",
    traineeId: "trainee-1",
    exerciseName: "Squat",
    date: getDate(0),
    weight: 100,
    sets: 4,
    reps: 6,
    notes: "Deep squats, good form",
  },
  {
    id: "lift-3",
    traineeId: "trainee-1",
    exerciseName: "Deadlift",
    date: getDate(-1),
    weight: 120,
    sets: 3,
    reps: 5,
    notes: "PR attempt next week",
  },
  {
    id: "lift-4",
    traineeId: "trainee-1",
    exerciseName: "Overhead Press",
    date: getDate(-1),
    weight: 50,
    sets: 4,
    reps: 8,
  },
  {
    id: "lift-5",
    traineeId: "trainee-1",
    exerciseName: "Barbell Row",
    date: getDate(-2),
    weight: 70,
    sets: 4,
    reps: 10,
  },
  {
    id: "lift-6",
    traineeId: "trainee-1",
    exerciseName: "Bench Press",
    date: getDate(-3),
    weight: 77.5,
    sets: 4,
    reps: 8,
  },
  {
    id: "lift-7",
    traineeId: "trainee-1",
    exerciseName: "Squat",
    date: getDate(-4),
    weight: 95,
    sets: 4,
    reps: 6,
  },
  {
    id: "lift-8",
    traineeId: "trainee-1",
    exerciseName: "Pull-ups",
    date: getDate(-5),
    weight: 10, // weighted
    sets: 4,
    reps: 8,
    notes: "Added 10kg plate",
  },
  {
    id: "lift-9",
    traineeId: "trainee-1",
    exerciseName: "Dumbbell Curl",
    date: getDate(-5),
    weight: 15,
    sets: 3,
    reps: 12,
  },
  {
    id: "lift-10",
    traineeId: "trainee-1",
    exerciseName: "Tricep Pushdown",
    date: getDate(-6),
    weight: 35,
    sets: 3,
    reps: 12,
  },
];

// Sample progress data
const sampleProgressData: ChartDataPoint[] = [
  { date: "2024-01-01", label: "Week 1", value: 70 },
  { date: "2024-01-08", label: "Week 2", value: 72.5 },
  { date: "2024-01-15", label: "Week 3", value: 75 },
  { date: "2024-01-22", label: "Week 4", value: 75 },
  { date: "2024-01-29", label: "Week 5", value: 77.5 },
  { date: "2024-02-05", label: "Week 6", value: 80 },
  { date: "2024-02-12", label: "Week 7", value: 80 },
  { date: "2024-02-19", label: "Week 8", value: 82.5 },
];

export const Default: Story = {
  args: {
    items: sampleLifts,
    progressData: sampleProgressData,
    title: "Fitness Tracking",
    subtitle: "Track lifts and monitor progress",
    showHeader: true,
    showSearch: true,
    showWellnessInput: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    items: [],
    error: { message: "Failed to load fitness data." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Fitness Tracking",
    subtitle: "Track lifts and monitor progress",
    showWellnessInput: true,
  },
};

export const WithoutWellnessInput: Story = {
  args: {
    items: sampleLifts,
    progressData: sampleProgressData,
    showWellnessInput: false,
  },
};

export const WithoutProgressChart: Story = {
  args: {
    items: sampleLifts,
    showWellnessInput: true,
  },
};

export const NoHeader: Story = {
  args: {
    items: sampleLifts,
    progressData: sampleProgressData,
    showHeader: false,
    showWellnessInput: true,
  },
};

export const ManyLifts: Story = {
  args: {
    items: [
      ...sampleLifts,
      ...sampleLifts.map((l, i) => ({
        ...l,
        id: `lift-extra-${i}`,
        date: getDate(-7 - i),
      })),
    ],
    progressData: sampleProgressData,
    showWellnessInput: true,
  },
};

export const SingleExercise: Story = {
  args: {
    items: sampleLifts.filter((l) => l.exerciseName === "Bench Press"),
    progressData: sampleProgressData,
    title: "Bench Press Progress",
    subtitle: "Track your bench press journey",
  },
};
