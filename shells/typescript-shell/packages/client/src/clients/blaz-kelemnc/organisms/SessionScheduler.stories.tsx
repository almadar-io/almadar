import type { Meta, StoryObj } from "@storybook/react";
import { SessionScheduler, TrainingSessionData } from "./SessionScheduler";

const meta: Meta<typeof SessionScheduler> = {
  title: "Blaz-Klemenc/Organisms/SessionScheduler",
  component: SessionScheduler,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    bookingMode: {
      control: "boolean",
      description: "Show available time slots for booking",
    },
    weekStartDate: {
      control: "date",
      description: "Start date of displayed week",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SessionScheduler>;

// Helper to generate dates relative to today
const getDate = (daysFromNow: number, hours: number = 10, minutes: number = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Sample sessions data
const sampleSessions: TrainingSessionData[] = [
  {
    id: "session-1",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "Upper Body Strength",
    description: "Focus on chest, shoulders, and arms",
    scheduledAt: getDate(0, 9, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-2",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    title: "HIIT Training",
    description: "High intensity interval training",
    scheduledAt: getDate(0, 14, 0),
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
    description: "Stretching and mobility work",
    scheduledAt: getDate(1, 10, 0),
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
    description: "Legs and glutes training",
    scheduledAt: getDate(2, 11, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-5",
    traineeId: "trainee-4",
    trainerId: "trainer-1",
    title: "Core & Stability",
    description: "Core strengthening exercises",
    scheduledAt: getDate(-1, 9, 0),
    duration: 45,
    status: "completed",
    isGroupSession: false,
  },
  {
    id: "session-6",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    title: "Personal Training",
    description: "One-on-one session",
    scheduledAt: getDate(-2, 15, 0),
    duration: 60,
    status: "cancelled",
    isGroupSession: false,
  },
  {
    id: "session-7",
    traineeId: "trainee-5",
    trainerId: "trainer-1",
    title: "Functional Training",
    description: "Functional movement patterns",
    scheduledAt: getDate(3, 8, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-8",
    traineeId: "trainee-6",
    trainerId: "trainer-1",
    title: "Boxing Cardio",
    description: "Boxing-based cardio workout",
    scheduledAt: getDate(4, 17, 0),
    duration: 45,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 6,
    youtubeLink: "https://youtube.com/watch?v=boxing",
  },
];

export const Default: Story = {
  args: {
    sessions: sampleSessions,
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const Empty: Story = {
  args: {
    sessions: [],
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const TodayOnly: Story = {
  args: {
    sessions: sampleSessions.filter(
      (s) => new Date(s.scheduledAt).toDateString() === new Date().toDateString()
    ),
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const BusyWeek: Story = {
  args: {
    sessions: [
      ...sampleSessions,
      // Add more sessions for a busy week
      {
        id: "session-9",
        title: "Morning Yoga",
        scheduledAt: getDate(0, 7, 0),
        duration: 60,
        status: "scheduled",
        isGroupSession: true,
        maxParticipants: 15,
      },
      {
        id: "session-10",
        title: "Evening Spin",
        scheduledAt: getDate(0, 18, 0),
        duration: 45,
        status: "scheduled",
        isGroupSession: true,
        maxParticipants: 20,
      },
      {
        id: "session-11",
        title: "PT Session",
        scheduledAt: getDate(1, 14, 0),
        duration: 60,
        status: "scheduled",
        isGroupSession: false,
      },
      {
        id: "session-12",
        title: "Assessment",
        scheduledAt: getDate(1, 16, 0),
        duration: 30,
        status: "scheduled",
        isGroupSession: false,
      },
    ],
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const AllStatuses: Story = {
  args: {
    sessions: [
      {
        id: "status-1",
        title: "Scheduled Session",
        scheduledAt: getDate(0, 9, 0),
        duration: 60,
        status: "scheduled",
        isGroupSession: false,
      },
      {
        id: "status-2",
        title: "In Progress Session",
        scheduledAt: getDate(0, 11, 0),
        duration: 60,
        status: "in-progress",
        isGroupSession: false,
      },
      {
        id: "status-3",
        title: "Completed Session",
        scheduledAt: getDate(-1, 10, 0),
        duration: 60,
        status: "completed",
        isGroupSession: false,
      },
      {
        id: "status-4",
        title: "Cancelled Session",
        scheduledAt: getDate(1, 14, 0),
        duration: 60,
        status: "cancelled",
        isGroupSession: false,
      },
    ],
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const GroupSessionsOnly: Story = {
  args: {
    sessions: sampleSessions.filter((s) => s.isGroupSession),
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};
