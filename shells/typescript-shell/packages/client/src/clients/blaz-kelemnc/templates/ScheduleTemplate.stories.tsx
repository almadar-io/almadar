import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleTemplate } from "./ScheduleTemplate";

// Define types inline to avoid bundling issues
interface TrainingSessionData {
  id: string;
  title: string;
  scheduledAt: Date;
  duration: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  traineeId?: string;
  trainerId?: string;
}

const meta: Meta<typeof ScheduleTemplate> = {
  title: "Blaz-Klemenc/Templates/ScheduleTemplate",
  component: ScheduleTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScheduleTemplate>;

// Helper to generate dates
const getDate = (
  daysFromNow: number,
  hours: number = 10,
  minutes: number = 0,
): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Sample sessions for calendar view
const sampleSessions: TrainingSessionData[] = [
  // Today
  {
    id: "s1",
    title: "Morning Strength",
    scheduledAt: getDate(0, 8, 0),
    duration: 60,
    status: "completed",
    isGroupSession: false,
  },
  {
    id: "s2",
    title: "HIIT Class",
    scheduledAt: getDate(0, 10, 0),
    duration: 45,
    status: "in-progress",
    isGroupSession: true,
    maxParticipants: 10,
  },
  {
    id: "s3",
    title: "Personal Training - Ana",
    scheduledAt: getDate(0, 14, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "s4",
    title: "Evening Yoga",
    scheduledAt: getDate(0, 18, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 15,
  },
  // Tomorrow
  {
    id: "s5",
    title: "Cardio Session",
    scheduledAt: getDate(1, 7, 0),
    duration: 45,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "s6",
    title: "Group Strength",
    scheduledAt: getDate(1, 11, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 8,
  },
  {
    id: "s7",
    title: "Personal Training - Marko",
    scheduledAt: getDate(1, 15, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  // Day after tomorrow
  {
    id: "s8",
    title: "Boxing Fundamentals",
    scheduledAt: getDate(2, 9, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 6,
  },
  {
    id: "s9",
    title: "Mobility Class",
    scheduledAt: getDate(2, 12, 0),
    duration: 45,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 12,
  },
  // Later in the week
  {
    id: "s10",
    title: "Assessment - New Client",
    scheduledAt: getDate(3, 10, 0),
    duration: 90,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "s11",
    title: "Group HIIT",
    scheduledAt: getDate(4, 17, 0),
    duration: 45,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 10,
  },
  {
    id: "s12",
    title: "Personal Training - Luka",
    scheduledAt: getDate(5, 9, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  // Past sessions
  {
    id: "s13",
    title: "Yesterday's Session",
    scheduledAt: getDate(-1, 10, 0),
    duration: 60,
    status: "completed",
    isGroupSession: false,
  },
  {
    id: "s14",
    title: "Cancelled Session",
    scheduledAt: getDate(-1, 14, 0),
    duration: 45,
    status: "cancelled",
    isGroupSession: false,
  },
];

export const Default: Story = {
  args: {
    items: sampleSessions,
    title: "Schedule",
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
    error: { message: "Failed to load schedule." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Schedule",
  },
};

export const BusyWeek: Story = {
  args: {
    items: [
      ...sampleSessions,
      // Add more sessions for a busy week
      {
        id: "b1",
        title: "Early Bird",
        scheduledAt: getDate(0, 6, 0),
        duration: 45,
        status: "scheduled",
      },
      {
        id: "b2",
        title: "Lunch Session",
        scheduledAt: getDate(0, 12, 0),
        duration: 45,
        status: "scheduled",
      },
      {
        id: "b3",
        title: "Late Evening",
        scheduledAt: getDate(0, 20, 0),
        duration: 60,
        status: "scheduled",
      },
      {
        id: "b4",
        title: "Morning 1",
        scheduledAt: getDate(1, 8, 0),
        duration: 60,
        status: "scheduled",
      },
      {
        id: "b5",
        title: "Morning 2",
        scheduledAt: getDate(1, 9, 0),
        duration: 60,
        status: "scheduled",
      },
      {
        id: "b6",
        title: "Afternoon",
        scheduledAt: getDate(2, 14, 0),
        duration: 45,
        status: "scheduled",
      },
      {
        id: "b7",
        title: "Evening",
        scheduledAt: getDate(2, 18, 0),
        duration: 60,
        status: "scheduled",
      },
    ],
    title: "Busy Week Schedule",
  },
};

export const LightWeek: Story = {
  args: {
    items: sampleSessions.slice(0, 4),
    title: "Light Week Schedule",
  },
};

export const AllCompleted: Story = {
  args: {
    items: sampleSessions.map((s) => ({ ...s, status: "completed" as const })),
    title: "Past Week",
  },
};
