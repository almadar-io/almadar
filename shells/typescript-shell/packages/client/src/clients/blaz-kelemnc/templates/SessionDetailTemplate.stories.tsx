import type { Meta, StoryObj } from "@storybook/react";
import { SessionDetailTemplate } from "./SessionDetailTemplate";

// Define types inline to avoid circular import issues
interface TrainingSessionData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  scheduledAt: Date;
  duration: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  youtubeLink?: string;
  notes?: string;
  location?: string;
}

interface ParticipantData {
  id: string;
  name: string;
  email?: string;
  attended?: boolean;
}

interface SessionExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

const meta: Meta<typeof SessionDetailTemplate> = {
  title: "Blaz-Klemenc/Templates/SessionDetailTemplate",
  component: SessionDetailTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SessionDetailTemplate>;

// Sample session data
const sampleSession: TrainingSessionData = {
  id: "session-1",
  traineeId: "trainee-1",
  trainerId: "trainer-1",
  title: "Upper Body Strength Training",
  scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  duration: 60,
  status: "scheduled",
  isGroupSession: false,
  notes:
    "Focus on progressive overload for bench press. Client mentioned slight shoulder discomfort last session - warm up thoroughly.",
  location: "Gym Floor A",
};

const groupSession: TrainingSessionData = {
  id: "session-2",
  traineeId: "trainee-2",
  trainerId: "trainer-1",
  title: "HIIT Group Training",
  scheduledAt: new Date(),
  duration: 45,
  status: "in-progress",
  isGroupSession: true,
  maxParticipants: 8,
  youtubeLink: "https://youtube.com/watch?v=example",
  notes: "High intensity interval training. Bring water and towel.",
  location: "Studio B",
};

const completedSession: TrainingSessionData = {
  id: "session-3",
  traineeId: "trainee-3",
  trainerId: "trainer-1",
  title: "Lower Body Assessment",
  scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
  duration: 75,
  status: "completed",
  isGroupSession: false,
  youtubeLink: "https://youtube.com/watch?v=recording",
};

const sampleTrainer = {
  id: "trainer-1",
  name: "Blaz Klemenc",
  email: "blaz@trainer.com",
};

const sampleParticipants: ParticipantData[] = [
  { id: "p1", name: "Ana Kovac", email: "ana@example.com", attended: true },
  {
    id: "p2",
    name: "Marko Horvat",
    email: "marko@example.com",
    attended: true,
  },
  { id: "p3", name: "Luka Novak", email: "luka@example.com", attended: false },
  { id: "p4", name: "Maja Krajnc", email: "maja@example.com", attended: true },
  { id: "p5", name: "Jan Vidmar", email: "jan@example.com", attended: true },
];

const sampleExercises: SessionExercise[] = [
  {
    name: "Bench Press",
    sets: 4,
    reps: 8,
    weight: 70,
    notes: "Increase weight if form is good",
  },
  { name: "Incline Dumbbell Press", sets: 3, reps: 10, weight: 25 },
  { name: "Cable Flyes", sets: 3, reps: 12 },
  { name: "Tricep Pushdowns", sets: 3, reps: 12, weight: 30 },
  { name: "Overhead Tricep Extension", sets: 3, reps: 10, weight: 20 },
];

export const Default: Story = {
  args: {
    data: sampleSession,
    trainer: sampleTrainer,
    exercises: sampleExercises,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: { message: "Failed to load session details." } as Error,
  },
};

export const NotFound: Story = {
  args: {
    data: undefined,
  },
};

export const GroupSession: Story = {
  args: {
    data: groupSession,
    trainer: sampleTrainer,
    participants: sampleParticipants,
    exercises: [
      { name: "Burpees", sets: 4, reps: 10 },
      { name: "Mountain Climbers", sets: 4, reps: 20 },
      { name: "Jump Squats", sets: 4, reps: 15 },
      { name: "Push-ups", sets: 4, reps: 12 },
      { name: "Plank Hold", sets: 3, reps: 45, notes: "45 seconds each" },
    ],
  },
};

export const CompletedSession: Story = {
  args: {
    data: completedSession,
    trainer: sampleTrainer,
    exercises: sampleExercises,
  },
};

export const InProgressSession: Story = {
  args: {
    data: {
      ...sampleSession,
      status: "in-progress",
      scheduledAt: new Date(),
    },
    trainer: sampleTrainer,
    exercises: sampleExercises,
  },
};

export const CancelledSession: Story = {
  args: {
    data: {
      ...sampleSession,
      status: "cancelled",
    },
    trainer: sampleTrainer,
  },
};

export const WithVideoLink: Story = {
  args: {
    data: {
      ...sampleSession,
      youtubeLink: "https://youtube.com/watch?v=session-recording",
    },
    trainer: sampleTrainer,
    exercises: sampleExercises,
  },
};

export const MinimalData: Story = {
  args: {
    data: {
      id: "session-min",
      title: "Quick Session",
      scheduledAt: new Date(),
      duration: 30,
      status: "scheduled",
    },
  },
};
