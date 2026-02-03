import type { Meta, StoryObj } from "@storybook/react";
import { SessionsTemplate } from "./SessionsTemplate";

// Define types inline to avoid bundling issues
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
  location?: string;
}

const meta: Meta<typeof SessionsTemplate> = {
  title: "Blaz-Klemenc/Templates/SessionsTemplate",
  component: SessionsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
    showFilters: { control: "boolean" },
    defaultStatusFilter: {
      control: { type: "select" },
      options: ["all", "scheduled", "in-progress", "completed", "cancelled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SessionsTemplate>;

// Helper to generate dates
const getDate = (daysFromNow: number, hours: number = 10): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, 0, 0, 0);
  return date;
};

// Sample sessions data
const sampleSessions: TrainingSessionData[] = [
  {
    id: "session-1",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "Upper Body Strength",
    scheduledAt: getDate(0, 9),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-2",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    title: "HIIT Training",
    scheduledAt: getDate(0, 14),
    duration: 45,
    status: "in-progress",
    isGroupSession: true,
    maxParticipants: 8,
    youtubeLink: "https://youtube.com/watch?v=example",
  },
  {
    id: "session-3",
    traineeId: "trainee-3",
    trainerId: "trainer-1",
    title: "Flexibility & Mobility",
    scheduledAt: getDate(1, 10),
    duration: 45,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 12,
  },
  {
    id: "session-4",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "Lower Body Focus",
    scheduledAt: getDate(2, 11),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-5",
    traineeId: "trainee-4",
    trainerId: "trainer-1",
    title: "Core & Stability",
    scheduledAt: getDate(-1, 9),
    duration: 45,
    status: "completed",
    isGroupSession: false,
  },
  {
    id: "session-6",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    title: "Personal Training",
    scheduledAt: getDate(-2, 15),
    duration: 60,
    status: "cancelled",
    isGroupSession: false,
  },
  {
    id: "session-7",
    traineeId: "trainee-5",
    trainerId: "trainer-1",
    title: "Functional Training",
    scheduledAt: getDate(3, 8),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-8",
    traineeId: "trainee-6",
    trainerId: "trainer-1",
    title: "Boxing Cardio",
    scheduledAt: getDate(-3, 17),
    duration: 45,
    status: "completed",
    isGroupSession: true,
    maxParticipants: 6,
  },
];

export const Default: Story = {
  args: {
    items: sampleSessions,
    title: "Training Sessions",
    subtitle: "Manage training sessions for your trainees",
    showHeader: true,
    showSearch: true,
    showFilters: true,
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
    error: { message: "Failed to load sessions. Please try again." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Training Sessions",
    subtitle: "Manage training sessions for your trainees",
  },
};

export const ScheduledOnly: Story = {
  args: {
    items: sampleSessions.filter((s) => s.status === "scheduled"),
    defaultStatusFilter: "scheduled",
    title: "Upcoming Sessions",
  },
};

export const CompletedOnly: Story = {
  args: {
    items: sampleSessions.filter((s) => s.status === "completed"),
    defaultStatusFilter: "completed",
    title: "Completed Sessions",
  },
};

export const InProgressOnly: Story = {
  args: {
    items: sampleSessions.filter((s) => s.status === "in-progress"),
    defaultStatusFilter: "in-progress",
    title: "Active Sessions",
  },
};

export const NoHeader: Story = {
  args: {
    items: sampleSessions,
    showHeader: false,
  },
};

export const MinimalView: Story = {
  args: {
    items: sampleSessions,
    showHeader: true,
    showSearch: false,
    showFilters: false,
  },
};
