import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleBoard } from "./ScheduleBoard";
import type { TrainingSessionData } from "./ScheduleBoard";

const getDate = (daysFromNow: number, hours: number, minutes: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

const mockSessions: TrainingSessionData[] = [
  {
    id: "session-1",
    title: "Personal Training - Ana",
    scheduledAt: getDate(0, 9, 0),
    duration: 60,
    status: "scheduled",
    isGroupSession: false,
  },
  {
    id: "session-2",
    title: "Group HIIT Class",
    scheduledAt: getDate(0, 11, 0),
    duration: 45,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 12,
  },
  {
    id: "session-3",
    title: "Personal Training - Marko",
    scheduledAt: getDate(0, 14, 0),
    duration: 60,
    status: "in-progress",
    isGroupSession: false,
    youtubeLink: "https://youtube.com/watch?v=example",
  },
  {
    id: "session-4",
    title: "Group Yoga",
    scheduledAt: getDate(1, 10, 0),
    duration: 75,
    status: "scheduled",
    isGroupSession: true,
    maxParticipants: 20,
  },
  {
    id: "session-5",
    title: "Personal Training - Luka",
    scheduledAt: getDate(2, 16, 0),
    duration: 60,
    status: "completed",
    isGroupSession: false,
  },
];

const meta: Meta<typeof ScheduleBoard> = {
  title: "Blaz-Klemenc/Organisms/ScheduleBoard",
  component: ScheduleBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ScheduleBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockSessions },
    createEvent: "CREATE",
    viewEvent: "VIEW",
    daySelectedEvent: "DAY_SELECTED",
    weekChangeEvent: "WEEK_CHANGE",
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
    error: new Error("Failed to load schedule"),
  },
};
