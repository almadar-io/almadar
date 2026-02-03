import type { Meta, StoryObj } from "@storybook/react";
import { WeeklyCalendar, CalendarEvent } from "./WeeklyCalendar";

const meta: Meta<typeof WeeklyCalendar> = {
  title: "Blaz-Klemenc/Organisms/WeeklyCalendar",
  component: WeeklyCalendar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    workingHoursStart: {
      control: { type: "number", min: 0, max: 23 },
      description: "Working hours start (24h format)",
    },
    workingHoursEnd: {
      control: { type: "number", min: 1, max: 24 },
      description: "Working hours end (24h format)",
    },
    slotDuration: {
      control: { type: "select" },
      options: [15, 30, 60],
      description: "Slot duration in minutes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeeklyCalendar>;

// Helper to generate dates relative to today
const getDate = (daysFromNow: number, hours: number = 10, minutes: number = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Sample events data
const sampleEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Personal Training - Ana",
    startTime: getDate(0, 9, 0),
    type: "personal",
    traineeId: "trainee-1",
    traineeName: "Ana Kovac",
  },
  {
    id: "event-2",
    title: "Group HIIT",
    startTime: getDate(0, 10, 0),
    type: "group",
  },
  {
    id: "event-3",
    title: "Lunch Break",
    startTime: getDate(0, 12, 0),
    type: "break",
  },
  {
    id: "event-4",
    title: "Personal Training - Marko",
    startTime: getDate(0, 14, 0),
    type: "personal",
    traineeId: "trainee-2",
    traineeName: "Marko Horvat",
  },
  {
    id: "event-5",
    title: "Group Yoga",
    startTime: getDate(1, 9, 0),
    type: "group",
  },
  {
    id: "event-6",
    title: "Personal Training - Luka",
    startTime: getDate(1, 11, 0),
    type: "personal",
    traineeId: "trainee-3",
    traineeName: "Luka Novak",
  },
  {
    id: "event-7",
    title: "Group Strength",
    startTime: getDate(2, 10, 0),
    type: "group",
  },
  {
    id: "event-8",
    title: "Personal Training - Maja",
    startTime: getDate(2, 15, 0),
    type: "personal",
    traineeId: "trainee-4",
    traineeName: "Maja Krajnc",
  },
  {
    id: "event-9",
    title: "Admin Break",
    startTime: getDate(3, 12, 0),
    type: "break",
  },
  {
    id: "event-10",
    title: "Group Boxing",
    startTime: getDate(3, 17, 0),
    type: "group",
  },
  {
    id: "event-11",
    title: "Personal Training - Jan",
    startTime: getDate(4, 8, 0),
    type: "personal",
    traineeId: "trainee-5",
    traineeName: "Jan Vidmar",
  },
  {
    id: "event-12",
    title: "Personal Training - Petra",
    startTime: getDate(4, 10, 0),
    type: "personal",
    traineeId: "trainee-6",
    traineeName: "Petra Zupan",
  },
];

export const Default: Story = {
  args: {
    events: sampleEvents,
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60,
  },
};

export const Empty: Story = {
  args: {
    events: [],
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60,
  },
};

export const EarlyMorningSchedule: Story = {
  args: {
    events: sampleEvents,
    workingHoursStart: 6,
    workingHoursEnd: 14,
    slotDuration: 60,
  },
};

export const EveningSchedule: Story = {
  args: {
    events: sampleEvents,
    workingHoursStart: 14,
    workingHoursEnd: 22,
    slotDuration: 60,
  },
};

export const HalfHourSlots: Story = {
  args: {
    events: sampleEvents,
    workingHoursStart: 8,
    workingHoursEnd: 18,
    slotDuration: 30,
  },
};

export const PersonalOnly: Story = {
  args: {
    events: sampleEvents.filter((e) => e.type === "personal"),
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60,
  },
};

export const GroupOnly: Story = {
  args: {
    events: sampleEvents.filter((e) => e.type === "group"),
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60,
  },
};

export const BusyDay: Story = {
  args: {
    events: [
      { id: "busy-1", title: "Session 1", startTime: getDate(0, 8, 0), type: "personal", traineeName: "Client A" },
      { id: "busy-2", title: "Session 2", startTime: getDate(0, 9, 0), type: "personal", traineeName: "Client B" },
      { id: "busy-3", title: "Session 3", startTime: getDate(0, 10, 0), type: "group" },
      { id: "busy-4", title: "Session 4", startTime: getDate(0, 11, 0), type: "personal", traineeName: "Client C" },
      { id: "busy-5", title: "Lunch", startTime: getDate(0, 12, 0), type: "break" },
      { id: "busy-6", title: "Session 5", startTime: getDate(0, 13, 0), type: "personal", traineeName: "Client D" },
      { id: "busy-7", title: "Session 6", startTime: getDate(0, 14, 0), type: "group" },
      { id: "busy-8", title: "Session 7", startTime: getDate(0, 15, 0), type: "personal", traineeName: "Client E" },
      { id: "busy-9", title: "Session 8", startTime: getDate(0, 16, 0), type: "personal", traineeName: "Client F" },
      { id: "busy-10", title: "Session 9", startTime: getDate(0, 17, 0), type: "group" },
    ],
    workingHoursStart: 8,
    workingHoursEnd: 18,
    slotDuration: 60,
  },
};
