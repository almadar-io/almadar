import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBoard } from "./ProgressBoard";
import type { ProgressEntryData } from "./ProgressBoard";

const mockEntries: ProgressEntryData[] = [
  {
    id: "progress-1",
    traineeId: "user-1",
    entryType: "kinesiology_exam",
    title: "Initial Posture Assessment",
    description: "Full body posture analysis and muscle imbalance screening",
    date: "2026-02-15",
    status: "completed",
  },
  {
    id: "progress-2",
    traineeId: "user-1",
    entryType: "special_exercise",
    title: "Corrective Hip Flexor Routine",
    description: "Custom exercise program targeting anterior pelvic tilt",
    date: "2026-02-16",
    status: "in_progress",
  },
  {
    id: "progress-3",
    traineeId: "user-2",
    entryType: "assessment",
    title: "Strength Baseline Test",
    description: "1RM testing for compound lifts",
    date: "2026-02-17",
    status: "planned",
  },
  {
    id: "progress-4",
    traineeId: "user-1",
    entryType: "milestone",
    title: "100kg Bench Press",
    description: "First time hitting 100kg on bench press",
    date: "2026-02-14",
    status: "completed",
  },
  {
    id: "progress-5",
    traineeId: "user-3",
    entryType: "kinesiology_exam",
    title: "Shoulder Mobility Re-evaluation",
    description: "Follow-up exam after 6 weeks of corrective exercises",
    date: "2026-02-18",
    status: "planned",
  },
];

const meta: Meta<typeof ProgressBoard> = {
  title: "Blaz-Klemenc/Organisms/ProgressBoard",
  component: ProgressBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ProgressBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockEntries },
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    searchEvent: "SEARCH",
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
    error: new Error("Failed to load progress entries"),
  },
};
